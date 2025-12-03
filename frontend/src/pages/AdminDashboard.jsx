import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [servicesRes, contactRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/api/services/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/contact`),
        fetch(`${API_URL}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (servicesRes.ok) setServices(await servicesRes.json());
      if (contactRes.ok) setContact(await contactRes.json());
      if (messagesRes.ok) setMessages(await messagesRes.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const deleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setServices(services.filter(s => s._id !== id));
      }
    } catch (err) {
      alert('Error deleting service');
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setMessages(messages.filter(m => m._id !== id));
        setShowMessageModal(false);
      }
    } catch (err) {
      alert('Error deleting message');
    }
  };

  const getServiceName = (serviceValue) => {
    const serviceMap = {
      'fractional-cfo': 'Fractional CFO Services',
      'fundraising': 'Fundraising Support',
      'gst': 'GST Compliance',
      'income-tax': 'Income Tax Services',
      'debt-recovery': 'Debt Recovery',
      'sez': 'SEZ Setup & Compliance',
      'erp': 'ERP Implementation',
      'other': 'Other Services'
    };
    return serviceMap[serviceValue] || serviceValue;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">Services</h2>
            <button
              onClick={() => {
                setEditingService(null);
                setShowServiceModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-[#333]"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          <div className="grid gap-4">
            {services.map((service) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-[#E5E5E5] rounded p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xl mb-2">{service.title}</h3>
                  <p className="text-[#8A8A8A] text-sm">{service.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setShowServiceModal(true);
                    }}
                    className="p-2 hover:bg-[#F2F2F2] rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">Contact Messages</h2>
            <span className="px-3 py-1 bg-[#520052] text-white rounded-full text-sm">
              {messages.length} messages
            </span>
          </div>

          {messages.length === 0 ? (
            <p className="text-[#8A8A8A] text-center py-8">No messages yet</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-[#E5E5E5] rounded p-4 hover:border-[#520052] transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedMessage(message);
                    setShowMessageModal(true);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{message.name}</h3>
                        <span className="text-sm text-[#8A8A8A]">{message.email}</span>
                      </div>
                      <p className="text-sm text-[#520052] mb-2">{getServiceName(message.service)}</p>
                      <p className="text-[#8A8A8A] text-sm line-clamp-2">{message.message}</p>
                      <p className="text-xs text-[#8A8A8A] mt-2">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message._id);
                      }}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">Contact Details</h2>
            <button
              onClick={() => setShowContactModal(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-[#333]"
            >
              Update Contact
            </button>
          </div>

          {contact && (
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Address:</strong> {contact.address}</p>
            </div>
          )}
        </div>
      </div>

      {showServiceModal && (
        <ServiceModal
          service={editingService}
          onClose={() => {
            setShowServiceModal(false);
            setEditingService(null);
          }}
          onSave={() => {
            fetchData();
            setShowServiceModal(false);
            setEditingService(null);
          }}
          token={token}
        />
      )}

      {showContactModal && (
        <ContactModal
          contact={contact}
          onClose={() => setShowContactModal(false)}
          onSave={() => {
            fetchData();
            setShowContactModal(false);
          }}
          token={token}
        />
      )}

      {showMessageModal && selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedMessage(null);
          }}
          onDelete={() => deleteMessage(selectedMessage._id)}
          getServiceName={getServiceName}
        />
      )}
    </div>
  );
}

function ServiceModal({ service, onClose, onSave, token }) {
  const [formData, setFormData] = useState(service || {
    title: '',
    description: '',
    icon: '',
    features: [],
    isActive: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = service
        ? `${API_URL}/api/services/${service._id}`
        : `${API_URL}/api/services`;
      
      const response = await fetch(url, {
        method: service ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
      }
    } catch (err) {
      alert('Error saving service');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl mb-6">{service ? 'Edit' : 'Add'} Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Icon (emoji or text)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded hover:bg-[#333]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#E5E5E5] py-2 rounded hover:bg-[#F2F2F2]"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ContactModal({ contact, onClose, onSave, token }) {
  const [formData, setFormData] = useState(contact || {
    email: '',
    phone: '',
    address: '',
    socialLinks: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
      }
    } catch (err) {
      alert('Error updating contact');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
      >
        <h2 className="text-2xl mb-6">Update Contact Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-black"
              rows="3"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded hover:bg-[#333]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#E5E5E5] py-2 rounded hover:bg-[#F2F2F2]"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


function MessageModal({ message, onClose, onDelete, getServiceName }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl">Message Details</h2>
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8A8A8A] mb-1">Name</label>
              <p className="text-lg font-medium">{message.name}</p>
            </div>
            <div>
              <label className="block text-sm text-[#8A8A8A] mb-1">Email</label>
              <a href={`mailto:${message.email}`} className="text-lg text-[#520052] hover:underline">
                {message.email}
              </a>
            </div>
          </div>

          {message.company && (
            <div>
              <label className="block text-sm text-[#8A8A8A] mb-1">Company</label>
              <p className="text-lg">{message.company}</p>
            </div>
          )}

          <div>
            <label className="block text-sm text-[#8A8A8A] mb-1">Service Interest</label>
            <p className="text-lg font-medium text-[#520052]">{getServiceName(message.service)}</p>
          </div>

          <div>
            <label className="block text-sm text-[#8A8A8A] mb-1">Message</label>
            <div className="bg-[#F2F2F2] p-4 rounded whitespace-pre-wrap">
              {message.message}
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#8A8A8A] mb-1">Submitted</label>
            <p className="text-sm">{new Date(message.createdAt).toLocaleString()}</p>
          </div>

          {message.emailSent && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-sm text-green-800">✓ Email notification sent</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-6 mt-6 border-t">
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Delete Message
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#E5E5E5] py-2 rounded hover:bg-[#F2F2F2]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

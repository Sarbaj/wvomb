import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut, LayoutDashboard, Package, Mail, Settings, Search, TrendingUp, Users, MessageSquare, Download, Filter, CheckCircle, Clock, Archive } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageFilter, setMessageFilter] = useState('all');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    activeServices: 0,
    totalServices: 0
  });
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

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData);
        setStats(prev => ({
          ...prev,
          totalServices: servicesData.length,
          activeServices: servicesData.filter(s => s.isActive).length
        }));
      }
      if (contactRes.ok) setContact(await contactRes.json());
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newCount = messagesData.filter(m => new Date(m.createdAt) >= today).length;
        setStats(prev => ({
          ...prev,
          totalMessages: messagesData.length,
          newMessages: newCount
        }));
      }
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

  const exportMessages = () => {
    const csv = [
      ['Name', 'Email', 'Company', 'Service', 'Message', 'Date'],
      ...messages.map(m => [
        m.name,
        m.email,
        m.company || '',
        getServiceName(m.service),
        m.message.replace(/\n/g, ' '),
        new Date(m.createdAt).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const messageDate = new Date(message.createdAt);
    
    const matchesFilter = 
      messageFilter === 'all' ||
      (messageFilter === 'today' && messageDate >= today) ||
      (messageFilter === 'week' && messageDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) ||
      (messageFilter === 'month' && messageDate >= new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesFilter;
  });

  const getMessagesByService = () => {
    const serviceCount = {};
    messages.forEach(m => {
      const service = getServiceName(m.service);
      serviceCount[service] = (serviceCount[service] || 0) + 1;
    });
    return Object.entries(serviceCount).sort((a, b) => b[1] - a[1]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#520052] mx-auto mb-4"></div>
          <p className="text-[#8A8A8A]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-light truncate">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1 hidden sm:block">Manage your services and messages</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg p-1 sm:p-2 mb-4 md:mb-6 flex gap-1 sm:gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'services', label: 'Services', icon: Package },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'contact', label: 'Contact', icon: Mail }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-[#520052] text-white'
                  : 'text-[#8A8A8A] hover:bg-[#F2F2F2]'
              }`}
            >
              <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 border-l-4 border-[#520052]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8A8A8A] mb-1">Total Messages</p>
                    <p className="text-3xl font-light">{stats.totalMessages}</p>
                  </div>
                  <MessageSquare className="text-[#520052]" size={32} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 border-l-4 border-green-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8A8A8A] mb-1">New Today</p>
                    <p className="text-3xl font-light">{stats.newMessages}</p>
                  </div>
                  <TrendingUp className="text-green-500" size={32} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8A8A8A] mb-1">Active Services</p>
                    <p className="text-3xl font-light">{stats.activeServices}</p>
                  </div>
                  <Package className="text-blue-500" size={32} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 border-l-4 border-orange-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8A8A8A] mb-1">Total Services</p>
                    <p className="text-3xl font-light">{stats.totalServices}</p>
                  </div>
                  <Settings className="text-orange-500" size={32} />
                </div>
              </motion.div>
            </div>

            {/* Service Interest Chart */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-light mb-6">Messages by Service</h2>
              <div className="space-y-4">
                {getMessagesByService().map(([service, count]) => (
                  <div key={service}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{service}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-[#F2F2F2] rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / stats.totalMessages) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-[#520052] to-[#8B008B] h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light">Recent Messages</h2>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-sm text-[#520052] hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {messages.slice(0, 5).map(message => (
                  <div
                    key={message._id}
                    className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded hover:border-[#520052] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedMessage(message);
                      setShowMessageModal(true);
                    }}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-[#8A8A8A]">{message.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#520052]">{getServiceName(message.service)}</p>
                      <p className="text-xs text-[#8A8A8A]">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-light">Services Management</h2>
                <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1">
                  {stats.activeServices} active of {stats.totalServices} total
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService(null);
                  setShowServiceModal(true);
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#520052] text-white rounded hover:bg-[#6B006B] transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                Add Service
              </button>
            </div>

            <div className="grid gap-3 md:gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-[#E5E5E5] rounded-lg p-4 md:p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                        {service.icon && <span className="text-xl md:text-2xl flex-shrink-0">{service.icon}</span>}
                        <h3 className="text-base sm:text-lg md:text-xl font-medium break-words">{service.title}</h3>
                        <span className={`px-2 md:px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                          service.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.isActive ? '● Active' : '○ Inactive'}
                        </span>
                      </div>
                      <p className="text-[#8A8A8A] text-xs sm:text-sm mb-2 md:mb-3 break-words">{service.description}</p>
                      <p className="text-xs text-[#8A8A8A]">
                        Created: {new Date(service.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setShowServiceModal(true);
                        }}
                        className="p-2 hover:bg-[#F2F2F2] rounded transition-colors"
                        title="Edit service"
                      >
                        <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button
                        onClick={() => deleteService(service._id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                        title="Delete service"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 md:p-6"
          >
            <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-light">Contact Messages</h2>
                <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1">
                  {filteredMessages.length} of {messages.length} messages
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#520052] text-sm"
                  />
                </div>
                <select
                  value={messageFilter}
                  onChange={(e) => setMessageFilter(e.target.value)}
                  className="px-3 py-2 border border-[#E5E5E5] rounded focus:outline-none focus:border-[#520052] text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button
                  onClick={exportMessages}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#520052] text-white rounded hover:bg-[#6B006B] transition-colors text-sm"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">Export</span>
                </button>
              </div>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <MessageSquare className="mx-auto text-[#E5E5E5] mb-4" size={40} />
                <p className="text-[#8A8A8A] text-sm md:text-base">No messages found</p>
              </div>
            ) : (
              <div className="grid gap-3 md:gap-4">
                <AnimatePresence>
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={message._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className="border border-[#E5E5E5] rounded-lg p-3 sm:p-4 md:p-5 hover:shadow-lg hover:border-[#520052] transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedMessage(message);
                        setShowMessageModal(true);
                      }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-medium break-words">{message.name}</h3>
                            <span className="text-xs sm:text-sm text-[#8A8A8A] break-all">{message.email}</span>
                            {message.emailSent && (
                              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                                <CheckCircle size={12} />
                                Sent
                              </span>
                            )}
                          </div>
                          {message.company && (
                            <p className="text-xs sm:text-sm text-[#8A8A8A] mb-2 break-words">Company: {message.company}</p>
                          )}
                          <p className="text-xs sm:text-sm text-[#520052] font-medium mb-2 break-words">
                            {getServiceName(message.service)}
                          </p>
                          <p className="text-[#8A8A8A] text-xs sm:text-sm line-clamp-2 mb-2 break-words">{message.message}</p>
                          <div className="flex items-center gap-2 text-xs text-[#8A8A8A]">
                            <Clock size={12} />
                            <span className="break-all">{new Date(message.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message._id);
                          }}
                          className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors self-end sm:self-start flex-shrink-0"
                          title="Delete message"
                        >
                          <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-light">Contact Information</h2>
                <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1">Manage your business contact details</p>
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#520052] text-white rounded hover:bg-[#6B006B] transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                Update Contact
              </button>
            </div>

            {contact && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="border border-[#E5E5E5] rounded-lg p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <Mail className="text-[#520052] flex-shrink-0" size={20} />
                    <h3 className="text-base md:text-lg font-medium">Email</h3>
                  </div>
                  <a href={`mailto:${contact.email}`} className="text-[#520052] hover:underline break-all text-sm md:text-base">
                    {contact.email}
                  </a>
                </div>

                <div className="border border-[#E5E5E5] rounded-lg p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <Users className="text-[#520052] flex-shrink-0" size={20} />
                    <h3 className="text-base md:text-lg font-medium">Phone</h3>
                  </div>
                  <a href={`tel:${contact.phone}`} className="text-[#520052] hover:underline break-all text-sm md:text-base">
                    {contact.phone}
                  </a>
                </div>

                <div className="border border-[#E5E5E5] rounded-lg p-4 md:p-5 md:col-span-2">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <Settings className="text-[#520052] flex-shrink-0" size={20} />
                    <h3 className="text-base md:text-lg font-medium">Address</h3>
                  </div>
                  <p className="text-[#8A8A8A] break-words text-sm md:text-base">{contact.address}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 md:p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl md:text-2xl mb-4 md:mb-6">{service ? 'Edit' : 'Add'} Service</h2>
        
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 md:p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Update Contact Details</h2>
        
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 md:p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl">Message Details</h2>
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-black text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Name</label>
              <p className="text-base md:text-lg font-medium break-words">{message.name}</p>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Email</label>
              <a href={`mailto:${message.email}`} className="text-base md:text-lg text-[#520052] hover:underline break-all">
                {message.email}
              </a>
            </div>
          </div>

          {message.company && (
            <div>
              <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Company</label>
              <p className="text-base md:text-lg break-words">{message.company}</p>
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Service Interest</label>
            <p className="text-base md:text-lg font-medium text-[#520052] break-words">{getServiceName(message.service)}</p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Message</label>
            <div className="bg-[#F2F2F2] p-3 md:p-4 rounded whitespace-pre-wrap text-sm md:text-base break-words">
              {message.message}
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[#8A8A8A] mb-1">Submitted</label>
            <p className="text-xs sm:text-sm">{new Date(message.createdAt).toLocaleString()}</p>
          </div>

          {message.emailSent && (
            <div className="bg-green-50 border border-green-200 rounded p-2 md:p-3">
              <p className="text-xs sm:text-sm text-green-800">✓ Email notification sent</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 md:pt-6 mt-4 md:mt-6 border-t">
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm sm:text-base"
          >
            Delete Message
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#E5E5E5] py-2 rounded hover:bg-[#F2F2F2] text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

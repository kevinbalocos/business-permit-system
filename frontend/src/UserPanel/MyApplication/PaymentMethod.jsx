import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  Wallet,
  QrCode
} from 'lucide-react';

const PaymentMethod = ({ 
  applicationNumber, 
  assessmentData, 
  onPaymentMethodSelect, 
  onSubmit, 
  isSubmitting 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: Smartphone,
      description: 'Pay using your GCash mobile wallet',
      fields: [
        { 
          key: 'mobileNumber', 
          label: 'GCash Mobile Number', 
          type: 'tel',
          placeholder: '09XX XXX XXXX',
          required: true 
        }
      ],
      color: 'blue'
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      icon: Wallet,
      description: 'Pay using your PayMaya account',
      fields: [
        { 
          key: 'mobileNumber', 
          label: 'PayMaya Mobile Number', 
          type: 'tel',
          placeholder: '09XX XXX XXXX',
          required: true 
        }
      ],
      color: 'green'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Transfer directly to government account',
      fields: [
        { 
          key: 'bankName', 
          label: 'Bank Name', 
          type: 'select',
          options: ['BDO', 'BPI', 'Metrobank', 'PNB', 'UnionBank', 'Security Bank', 'Other'],
          required: true 
        },
        { 
          key: 'accountNumber', 
          label: 'Account Number', 
          type: 'text',
          placeholder: 'Your account number',
          required: true 
        },
        { 
          key: 'accountName', 
          label: 'Account Holder Name', 
          type: 'text',
          placeholder: 'Full name as it appears on account',
          required: true 
        }
      ],
      color: 'purple'
    },
    {
      id: 'over_counter',
      name: 'Over the Counter',
      icon: Building2,
      description: 'Pay at authorized payment centers',
      fields: [
        { 
          key: 'paymentCenter', 
          label: 'Preferred Payment Center', 
          type: 'select',
          options: ['City Hall', 'Bayad Center', '7-Eleven', 'SM Bills Payment', 'Robinsons Bills Payment'],
          required: true 
        }
      ],
      color: 'orange'
    },
    {
      id: 'credit_card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay using Visa, Mastercard, or other cards',
      fields: [
        { 
          key: 'cardNumber', 
          label: 'Card Number', 
          type: 'text',
          placeholder: '1234 5678 9012 3456',
          required: true 
        },
        { 
          key: 'expiryDate', 
          label: 'Expiry Date', 
          type: 'text',
          placeholder: 'MM/YY',
          required: true 
        },
        { 
          key: 'cvv', 
          label: 'CVV', 
          type: 'text',
          placeholder: '123',
          required: true 
        },
        { 
          key: 'cardName', 
          label: 'Cardholder Name', 
          type: 'text',
          placeholder: 'Name on card',
          required: true 
        }
      ],
      color: 'red'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setPaymentDetails({});
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return false;

    const newErrors = {};
    
    method.fields.forEach(field => {
      if (field.required && !paymentDetails[field.key]?.trim()) {
        newErrors[field.key] = `${field.label} is required`;
      }
      
      // Additional validations
      if (field.key === 'mobileNumber' && paymentDetails[field.key]) {
        const phone = paymentDetails[field.key].replace(/\D/g, '');
        if (phone.length !== 11 || !phone.startsWith('09')) {
          newErrors[field.key] = 'Please enter a valid mobile number (09XXXXXXXXX)';
        }
      }
      
      if (field.key === 'cardNumber' && paymentDetails[field.key]) {
        const cardNum = paymentDetails[field.key].replace(/\D/g, '');
        if (cardNum.length < 13 || cardNum.length > 19) {
          newErrors[field.key] = 'Please enter a valid card number';
        }
      }
      
      if (field.key === 'cvv' && paymentDetails[field.key]) {
        const cvv = paymentDetails[field.key].replace(/\D/g, '');
        if (cvv.length < 3 || cvv.length > 4) {
          newErrors[field.key] = 'Please enter a valid CVV';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!selectedMethod) {
      setErrors({ general: 'Please select a payment method' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    onPaymentMethodSelect(selectedMethod, paymentDetails);
    onSubmit();
  };

  const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Step 3: Payment Method</h2>
            <p className="text-teal-100">Choose how you'd like to pay for your permit</p>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Business Permit Fee</p>
            <p className="text-sm text-gray-600">Application #{applicationNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-teal-600">
              ₱{assessmentData?.fees?.total?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-gray-500">All fees inclusive</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.general}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <div
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? `border-${method.color}-500 bg-${method.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? `bg-${method.color}-100` : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? `text-${method.color}-600` : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    {isSelected && (
                      <div className="mt-2">
                        <CheckCircle className={`w-5 h-5 text-${method.color}-600`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Details Form */}
      {selectedMethodData && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            {selectedMethodData.name} Details
          </h3>
          
          <div className="space-y-4">
            {selectedMethodData.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    value={paymentDetails[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={paymentDetails[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
                
                {errors[field.key] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Payment Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions</h4>
            <div className="text-sm text-blue-800">
              {selectedMethod === 'gcash' && (
                <ul className="space-y-1">
                  <li>1. Open your GCash app</li>
                  <li>2. Scan the QR code or enter the reference number</li>
                  <li>3. Enter the exact amount: ₱{assessmentData?.fees?.total?.toFixed(2)}</li>
                  <li>4. Complete the payment and save the receipt</li>
                </ul>
              )}
              
              {selectedMethod === 'paymaya' && (
                <ul className="space-y-1">
                  <li>1. Open your PayMaya app</li>
                  <li>2. Go to Bills Payment section</li>
                  <li>3. Select Government Payments</li>
                  <li>4. Enter reference number and amount</li>
                </ul>
              )}
              
              {selectedMethod === 'bank_transfer' && (
                <div>
                  <p className="font-medium mb-2">Transfer to:</p>
                  <p>Account Name: City Government of [City Name]</p>
                  <p>Account Number: 1234-5678-9012</p>
                  <p>Amount: ₱{assessmentData?.fees?.total?.toFixed(2)}</p>
                  <p className="mt-2 text-xs">Please include your application number in the transfer notes.</p>
                </div>
              )}
              
              {selectedMethod === 'over_counter' && (
                <ul className="space-y-1">
                  <li>1. Bring this reference number to your selected payment center</li>
                  <li>2. Present a valid ID</li>
                  <li>3. Pay the exact amount: ₱{assessmentData?.fees?.total?.toFixed(2)}</li>
                  <li>4. Keep your official receipt</li>
                </ul>
              )}
              
              {selectedMethod === 'credit_card' && (
                <ul className="space-y-1">
                  <li>1. Ensure your card has sufficient credit limit</li>
                  <li>2. You will be redirected to secure payment gateway</li>
                  <li>3. Complete 3D Secure authentication if required</li>
                  <li>4. Save the transaction receipt</li>
                </ul>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-gray-600 mt-0.5" />
              <div className="text-xs text-gray-600">
                <p className="font-medium mb-1">Security Notice:</p>
                <p>Your payment information is encrypted and secure. We do not store your payment details on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              Total Amount: ₱{assessmentData?.fees?.total?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-gray-600">
              Payment for Application #{applicationNumber}
            </p>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!selectedMethod || isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold text-white min-w-[200px] ${
              selectedMethod && !isSubmitting
                ? 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </div>

        {/* Terms */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            By proceeding, you agree to our{' '}
            <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* QR Code for Mobile Payments */}
      {(selectedMethod === 'gcash' || selectedMethod === 'paymaya') && (
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <h4 className="font-semibold mb-4">Scan to Pay</h4>
          <div className="inline-block p-4 bg-gray-100 rounded-lg">
            <QrCode className="w-32 h-32 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Reference: {applicationNumber}
          </p>
          <p className="text-lg font-semibold mt-1">
            ₱{assessmentData?.fees?.total?.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
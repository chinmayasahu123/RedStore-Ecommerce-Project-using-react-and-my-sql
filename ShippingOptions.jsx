import { useState } from 'react';
import { FaShippingFast, FaBolt } from 'react-icons/fa';

const ShippingOptions = () => {
  // State to track the currently selected shipping method. Defaults to 'standard'.
  const [selectedMethod, setSelectedMethod] = useState('standard');

  const options = [
    {
      id: 'standard',
      icon: <FaShippingFast className="text-3xl text-blue-500" />,
      name: 'Standard Shipping',
      price: 'Free',
      duration: '5–7 business days',
    },
    {
      id: 'express',
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      name: 'Express Shipping',
      price: '₹500.00',
      duration: '1–2 business days',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-text-primary dark:text-dark-text-primary">Shipping Method</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedMethod(option.id)}
            // Conditional styling for the selected card
            className={`
              p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
              flex items-center space-x-4
              ${selectedMethod === option.id
                ? 'border-primary dark:border-dark-primary bg-primary/10' // Selected state
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-surface' // Default state
              }
              hover:shadow-lg hover:scale-[1.02]
            `}
          >
            {option.icon}
            <div>
              <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">{option.name}</h3>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{option.duration}</p>
            </div>
            <span className="ml-auto font-semibold text-text-primary dark:text-dark-text-primary">{option.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;
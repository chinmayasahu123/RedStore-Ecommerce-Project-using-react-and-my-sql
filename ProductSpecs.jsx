const ProductSpecs = () => {
  const specsData = [
    { feature: 'Material', details: '100% Premium Cotton' },
    { feature: 'Available Sizes', details: 'S, M, L, XL, XXL' },
    { feature: 'Available Colors', details: 'Red, Blue, Black, White' },
    { feature: 'Fit', details: 'Regular Fit, comfort-stretch fabric' },
    { feature: 'Care Instructions', details: 'Machine wash cold, tumble dry low' },
    { feature: 'Warranty', details: '6 Months on manufacturing defects' },
  ];

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-dark-text-primary relative title">Product Specifications</h2>
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <div className="border border-gray-300 shadow-2xl rounded-xl overflow-hidden bg-white dark:bg-gray-800">
          <table className="w-full text-left text-text-secondary dark:text-dark-text-secondary">
            {/* Table Header */}
            {/* Table Header */}
<thead className="bg-red-600 text-white uppercase text-sm">
  <tr>
    <th scope="col" className="px-6 py-4 font-bold">Feature</th>
    <th scope="col" className="px-6 py-4 font-bold">Details</th>
  </tr>
</thead>

{/* Table Body */}
<tbody>
  {specsData.map((spec, index) => (
    <tr
      key={index}
      className={`${
        index % 2 === 0
          ? 'bg-white dark:bg-gray-800'
          : 'bg-gray-100 dark:bg-gray-700'
      } hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`}
    >
      <td className="px-6 py-4 font-medium text-text-primary dark:text-dark-text-primary whitespace-nowrap">
        {spec.feature}
      </td>
      <td className="px-6 py-4 text-text-secondary dark:text-dark-text-secondary">
        {spec.details}
      </td>
    </tr>
  ))}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
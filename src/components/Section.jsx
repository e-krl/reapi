const Section = ({ section, data, handleKeyChange, handleValueChange, add, del}) => {
    return (
        <div id={section} className="mb-4">
        <h2 className="font-bold mb-2">{section.toUpperCase()}</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Key</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody id="tableBody">
          {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                    <td className="px-4 py-2">{key}</td>
                    <td className="px-4 py-2">{value}</td>
                    <td className="px-4 py-2">
                    <button
                        className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white focus:outline-none"
                        onClick={() => del(key)}
                    >
                    </button>
                    </td>
                </tr>
                ))}
            <tr>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded"
                  onChange={handleKeyChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded"
                  onChange={handleValueChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={add}
        >
          Add
        </button>
      </div>
    );
}

export default Section;
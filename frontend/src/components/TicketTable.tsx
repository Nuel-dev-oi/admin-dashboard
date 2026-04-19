interface Table {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export default function TicketTable({ tickets }: { tickets: Table[] }) {
  return (
    <div className="overflow-x-auto md:overflow-x-hidden w-full flex justify-center items-center">
      <table className="border-2 md:m-2 text-[14px] font-normal w-full md:w-[90%] h-[clamp(30vh,40vh,50vh)]">
        <thead className="font-bold text-[12px] md:text-[16px] text-center">
          <tr>
            {Object.keys(tickets[0]).map((key, index) => {
              let displayKey = key.charAt(0).toUpperCase() + key.slice(1);
              if (displayKey === "CreatedAt") displayKey = "Created At";
              if (displayKey === "UpdatedAt") displayKey = "Updated At";
              return (
                <th key={index} className="border p-[2px_5px] md:p-[4px_14px]">
                  {displayKey}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => {
            return (
              <tr key={index}>
                {Object.values(ticket).map((value: string, index) => {
                  if (
                    value.match(/T\d{1,2}:\d{1,2}:\d{1,2}\.\d{3}Z$/) !== null
                  ) {
                    const stringVal =
                      new Date(value).toLocaleDateString() +
                      " at " +
                      new Date(value).toLocaleTimeString();
                    return (
                      <td
                        key={index}
                        className="border p-[2px_2px] md:p-[4px_14px] whitespace-normal md:whitespace-nowrap"
                      >
                        {stringVal}
                      </td>
                    );
                  }
                  const displayValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  return (
                    <td key={index} className="border p-[4px_14px]">
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

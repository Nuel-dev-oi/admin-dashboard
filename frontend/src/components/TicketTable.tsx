interface Table {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export default function TicketTable({ tickets }: { tickets: Table[] }) {
  return (
    <table className="border-2 m-2 text-[14px] font-normal w-[90%] h-[clamp(30vh,40vh,50vh)]">
      <thead className="font-bold text-[16px] text-center">
        <tr className="">
          {Object.keys(tickets[0]).map((key, index) => {
            let displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            if (displayKey === "CreatedAt") displayKey = "Created At";
            if (displayKey === "UpdatedAt") displayKey = "Updated At";
            return (
              <th key={index} className="border p-[4px_14px]">
                {displayKey}
              </th>
            );
          })}
        </tr>
      </thead>
      {tickets.map((ticket, index) => {
        return (
          <tbody key={index}>
            <tr>
              {Object.values(ticket).map((value: string, index) => {
                if (value.match(/T\d{1,2}:\d{1,2}:\d{1,2}\.\d{3}Z$/) !== null) {
                  const stringVal =
                    new Date(value).toLocaleDateString() +
                    " at " +
                    new Date(value).toLocaleTimeString();
                  return (
                    <td key={index} className="border p-[4px_14px]">
                      {stringVal}
                    </td>
                  );
                }
                return (
                  <td key={index} className="border p-[4px_14px]">
                    {value}
                  </td>
                );
              })}
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}

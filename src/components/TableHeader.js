import React, { useState, useMemo } from "react";

function Table(props) {
  const [hourTracked, setHours] = useState(0);
  const [billingAmount, setBilling] = useState(0);

  const calculateRevenue = useMemo(() => {
    let temphr = 0;
    let tempbil = 0;
    //console.log(props.data);
    props.data.map((rec) => {
      temphr += parseInt(rec.billableHours);
      tempbil += parseInt(rec.billableAmount);

      return { x: temphr, y: tempbil };
    });
    setHours(temphr.toLocaleString("en-US"));
    setBilling(tempbil.toLocaleString("en-US"));
  }, [props.data]);

  return (
    <>
      {calculateRevenue}
      <div className="total">
        <section className="hr">
          <label>Hours Tracked</label>
          <h2 className="bl">{hourTracked}</h2>
        </section>
        <section className="bill">
          <label>Billable Amount</label>
          <h2 className="b2">${billingAmount}</h2>
        </section>
      </div>
    </>
  );
}

export default Table;

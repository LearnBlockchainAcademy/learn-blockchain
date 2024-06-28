"use client";

import React, { useEffect } from "react";

const BuyEnergy = () => {
  const [energyValue, setEnergyValue] = React.useState(0);
  const [energyPrice, setEnergyPrice] = React.useState(0);
  const [energyRate, setEnergyRate] = React.useState(0);
  const [fund, setFund] = React.useState(0);
  const [token, setToken] = React.useState("");
  //@ts-ignore
  const admin = true;
  const conversionRate = 0.0005;

  useEffect(() => {
    // checks if the user is an admin and set admin respectively
  });

  /**
   * Set the price from the value of the energy
   * @param energyVal The value of energy
   */
  const setPriceFromValue = (energyVal: number) => {
    const price = energyVal * conversionRate;
    setEnergyPrice(price);
  };

  /**
   * Set the emergy value from the input price
   * @param price The price of energy
   */
  const setValueFromPrice = (price: number) => {
    const energyVal = price / conversionRate;
    setEnergyValue(energyVal);
  };
  const Withdraw = () => {
    // make contract call
  };
  const UpdateRate = () => {
    // make contract call
  };
  const Buy = () => {
    // handle contract call
    setToken("123456");
    //@ts-ignore
    document.getElementById("my_modal_1").showModal();
  };
  return (
    <div className="flex justify-center m-auto">
      {/* User side */}
      <div className="card ">
        <h1 className="card-title">Buy Energy</h1>
        <div>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Energy Value</span>
              <span className="label-text-alt">KWh</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered rounded-lg border-[#d941a9] dark:bg-neutral dark:text-black w-full max-w-xs"
              value={energyValue}
              onChange={e => {
                setEnergyValue(Number(e.target.value));
                setPriceFromValue(Number(e.target.value));
              }}
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Price</span>
              <span className="label-text-alt">ETH</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              value={energyPrice}
              className="input input-bordered rounded-lg border-[#d941a9] dark:bg-neutral dark:text-black w-full max-w-xs"
              onChange={e => {
                setEnergyPrice(Number(e.target.value));
                setValueFromPrice(Number(e.target.value));
              }}
            />
          </label>
        </div>
        <button
          className="btn bg-[#00247b] rounded-lg text-white btn-ghost dark:bg-white dark:text-black btn-wide mt-2"
          onClick={Buy}
        >
          {" "}
          Buy{" "}
        </button>
        <a href="/history" className="mt-3 text-xs">
          Click here to view payment history
        </a>
      </div>
      {admin && <div className="divider lg:divider-horizontal"></div>}
      {/* Admin side */}

      {admin && (
        <div className="card">
          <h3 className="card-title">Admin controls</h3>
          <div>
            <div className="my-2">
              <label className="form-control w-full  max-w-xs">
                <div className="label">
                  <span className="label-text">Change Energy Rate</span>
                  <span className="label-text-alt">KWh</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered rounded-lg border-[#d941a9] dark:bg-neutral dark:text-black w-full max-w-xs"
                  value={energyRate}
                  onChange={e => {
                    setEnergyRate(Number(e.target.value));
                  }}
                />
              </label>
              <button
                className="btn bg-[#00247b] rounded-lg text-white btn-ghost dark:bg-white dark:text-black btn-wide mt-2"
                onClick={UpdateRate}
              >
                {" "}
                Update{" "}
              </button>
            </div>
            <div>
              <div className="my-2">
                <label className="form-control w-full  max-w-xs">
                  <div className="label">
                    <span className="label-text">Withdraw fund</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered rounded-lg border-[#d941a9] dark:bg-neutral dark:text-black w-full max-w-xs"
                    value={fund}
                    onChange={e => {
                      setFund(Number(e.target.value));
                    }}
                  />
                </label>
                <button
                  className="btn bg-[#00247b] rounded-lg text-white btn-ghost dark:bg-white dark:text-black btn-wide mt-2"
                  onClick={Withdraw}
                >
                  {" "}
                  Withdraw{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Transaction successful!</h3>
          <p className="py-4">Here is your token</p>
          <p className="py-4">{token}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-[#00247b] rounded-lg text-white btn-ghost dark:bg-white dark:text-black">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BuyEnergy;

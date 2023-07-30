import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/input/Input";
import {useState} from "react";

export default function TransactionDetails() {
  const [discount, setDiscount] = useState();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver({}),
    criteriaMode: "all",
  });
  return (
    <>
      <div className="card border-0 bg-light">
        <div className="card-body">
          <ul className="">
            <li>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <span className="fw-semibold">Total</span>
                <span className="text-muted">0</span>
              </div>
            </li>
            <li>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <span className="fw-semibold">Total excise duty</span>
                <span className="text-muted">0</span>
              </div>
            </li>
            <li>
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-semibold">
                  <div className="d-flex gap-3">
                    <span>Discount</span>
                    <div>
                      <Input
                        type="number"
                        name="discount"
                        label=""
                        required={true}
                        placeholder=""
                        message=""
                        className="form-small"
                        labelClass=""
                        disabled={false}
                        register={register}
                        errors={errors}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </span>
                <span className="text-muted text-break text-end ps-3">
                  {getValues("discount")}%
                </span>
              </div>
            </li>

            <li>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <span className="fw-semibold">Non-Taxable Total</span>
                <span className="text-muted">0</span>
              </div>
            </li>
            <li>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <span className="fw-semibold">Taxable Total</span>
                <span className="text-muted">0</span>
              </div>
            </li>
            <li>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <span className="fw-semibold">Vat</span>
                <span className="text-muted">0</span>
              </div>
            </li>
            <li>
              <div className="d-flex flex-wrap justify-content-between border-top">
                <span className="fw-semibold fs-5">Grand Total</span>
                <span className="text-muted">0</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

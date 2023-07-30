import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "components/input/Input";

export default function TransactionDetails() {
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
      <div className="card border-0 ">
        <div className="card-body">
          <ul className="">
            <div className="mb-3">
              <li>
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <span className="">Total</span>
                  <span className="text-muted">Rs. 0</span>
                </div>
              </li>
              <li>
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <span className="">Total excise duty</span>
                  <span className="text-muted d-flex flex-nowrap gap-2">
                    Rs.{" "}
                    <Input
                      type="number"
                      name="note"
                      label=""
                      required={false}
                      placeholder=""
                      className="form-small"
                      labelClass=""
                      disabled={false}
                      register={register}
                      errors={errors}
                    />
                  </span>
                </div>
              </li>
              <li>
                <div className="d-flex justify-content-between mb-1">
                  <span className="">
                    <div className="d-flex gap-3">
                      <span>Discount</span>
                    </div>
                  </span>
                  <span className="text-muted text-break text-end ps-3">
                    {getValues("discount")}%
                  </span>
                </div>
              </li>

              <li>
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <span className="">Non-Taxable Total</span>
                  <span className="text-muted">Rs. 0</span>
                </div>
              </li>
              <li>
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <span className="">Taxable Total</span>
                  <span className="text-muted">Rs. 0</span>
                </div>
              </li>
              <li>
                <div className="d-flex flex-wrap justify-content-between mb-1">
                  <span className="">VAT</span>
                  <span className="text-muted">Rs. 0</span>
                </div>
              </li>
            </div>
            <div className="my-3">
              <li>
                <div className="d-flex flex-wrap justify-content-between border-top">
                  <span className=" ">Grand Total</span>
                  <span className="text-muted">Rs. 0</span>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

import Input from "components/input/Input";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendars from "components/input/Calendars";
import {ButtonSubmit} from "components/buttons";
import {showLoadingNotification} from "components/notification";
import TransactionDetails from "components/card/TransactionDetails";
import ReactTableCustom, {
  paginateCount,
} from "components/table/ReactTableCustom";
import {THead} from "components/table";
import {useState} from "react";

const schema = yup.object().shape({
  suppliers: yup
    .string()
    .required("Supplier Name is Required.")
    .min(100)
    .max(300),
});

export default function Home() {
  const [items, setNewItems] = useState([
    {
      id: 1,
      name: "Product name",
      batch: 1,
      warehouse: "Ktm",
      quantity: 30,
      rate: 2300,
      discount: 100,
      tax: "13% vat",
      amount: 4500,
    },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const wait = (delay, ...args) =>
    new Promise((resolve) => setTimeout(resolve, delay, ...args));

  const depositNote = async (data) => {
    try {
      return wait(3000).then(() => ({message: "Successful"}));
    } catch (error) {
      return error.message;
    }
  };

  const submit = async (data) => {
    const loadingToast = showLoadingNotification("...Processing");
    const response = await depositNote(data);
    loadingToast.success(response.message);
  };

  const firstPage = () => {};
  const nextPage = () => {};
  const lastPage = () => {};
  const prevPage = () => {};

  const addNewItems = () => {
    let id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    setNewItems([
      ...items,
      {
        id: id,
        name: "Product name",
        batch: 1,
        warehouse: "Ktm",
        quantity: 30,
        rate: 2300,
        discount: 100,
        tax: "13% vat",
        amount: 4500,
      },
    ]);
  };

  const removeItems = (item_id) => {
    const itemsList = items.filter(({id}) => item_id != id);
    setNewItems(itemsList);
  };
  return (
    <>
      <section className="bg-light">
        <div className="container ">
          <div className="row">
            <div className="col-md-12">
              <div className="card border-0 shadow-sm mt-5">
                <div className="card-body">
                  <div className="mb-4">
                    <h4>New Debit Note</h4>
                  </div>
                  <form onSubmit={handleSubmit(submit)}>
                    <div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <Input
                            type="text"
                            name="suppliers"
                            label="Suppliers"
                            required={true}
                            placeholder="eg: Clerk Corporation"
                            message=""
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <Controller
                            name="date"
                            control={control}
                            render={({field}) => {
                              return (
                                <>
                                  <Calendars
                                    {...field}
                                    label="Record Date"
                                    name="dob"
                                    placeholder="Date"
                                    className="w-100"
                                    selectionMode="range"
                                    numberOfMonths={2}
                                    message=""
                                    // onChange={(e) => {
                                    //   const date = e.value;
                                    //   if (e.value !== null) {
                                    //     setValue("dob", e.value);
                                    //   }
                                    // }}
                                    value={getValues("dob")}
                                    errors={errors}
                                  />
                                </>
                              );
                            }}
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <Input
                            type="text"
                            name="reference"
                            label="Reference"
                            required={true}
                            placeholder="Enter reference"
                            message=""
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 border-top mb-5">
                          <div className="">
                            {true && (
                              <ReactTableCustom
                                header=""
                                data={items}
                                columns={columns(removeItems)}
                                tableHeaderShow={true}
                                headerShow={false}
                                loading={false}
                                sorting={false}
                                paginate={false}
                                paginatePosition={"top"}
                                paginateValue={paginateCount(items)}
                                firstPage={firstPage}
                                nextPage={nextPage}
                                lastPage={lastPage}
                                prevPage={prevPage}
                              />
                            )}
                          </div>
                          <div>
                            <span
                              className="link_action-bg pointer fw-semibold"
                              onClick={addNewItems}
                            >
                              Add Order or Product
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <Input
                            type="textarea"
                            name="note"
                            label="Note"
                            required={false}
                            placeholder="Enter note"
                            message="*The note is required."
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                        <div className="col-6 mb-3  ">
                          <TransactionDetails />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <Input
                            type="textarea"
                            name="terms-condition"
                            label="Terms & Conditions"
                            required={false}
                            placeholder="Enter note"
                            message=""
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="text-end">
                        <ButtonSubmit
                          spin={isSubmitting}
                          className="btn-lg w-auto"
                          label="Save"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const columns = (removeItems) => {
  return [
    // {
    //   Header: <THead className="" title="id" />,
    //   accessor: "id",
    //   classNameHeader: "",
    //   classNameCell: "",
    //   disableSortBy: true,
    //   Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    // },
    {
      Header: <THead className="" title="Item/Product" />,
      accessor: "name",
      classNameHeader: "",
      classNameCell: "",
      disableSortBy: true,
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="Batch" />,
      accessor: "batch",
      classNameHeader: "",
      classNameCell: "",
      disableSortBy: true,
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="Warehouse" />,
      accessor: "warehouse",
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="Qty" />,
      accessor: "quantity",
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="Rate" />,
      accessor: "rate",
      Cell: ({cell: {value, column}, row: {original, index}}) => (
        <>
          <div>{value}</div>
        </>
      ),
    },
    {
      Header: <THead className="" title="Tax" />,
      accessor: "tax",
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="Amount" />,
      accessor: "amount",
      Cell: ({cell: {value, column}, row: {original, index}}) => <>{value}</>,
    },
    {
      Header: <THead className="" title="" />,
      accessor: "actions",
      Cell: ({cell: {value, column}, row: {original, index}}) => (
        <>
          <div className="pointer">
            <span
              className="text-danger"
              onClick={() => {
                removeItems(original.id);
              }}
            >
              <i class="bi bi-x-lg"></i>
            </span>
          </div>
        </>
      ),
    },
  ];
};

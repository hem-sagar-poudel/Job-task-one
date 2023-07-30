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
  suppliers: yup.string().required("Supplier Name is Required.").max(300),
  date: yup.string().required("Date is Required."),
  reference: yup.string().required("Reference is Required."),
});

export default function Home() {
  const [showFields, setShowFields] = useState(false);
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
                    <div className="d-flex justify-content-between">
                      <h5>New Debit Note</h5>
                      <div className="pointer h3 link_light-bg">
                        <i class="bi bi-x"></i>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(submit)}>
                    <div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 mb-3">
                          <Input
                            type="text"
                            name="suppliers"
                            label="Suppliers name"
                            required={true}
                            placeholder="Select Suppliers"
                            message=""
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 mb-3">
                          <Controller
                            name="date"
                            control={control}
                            render={({field}) => {
                              return (
                                <>
                                  <Calendars
                                    {...field}
                                    label="Delivery date"
                                    name="date"
                                    placeholder="Date"
                                    required={true}
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
                        <div className="col-xl-4 col-lg-6 mb-3">
                          <Input
                            type="text"
                            name="reference"
                            label="Invoice reference no"
                            required={true}
                            placeholder="Select invoice reference"
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
                        <div className="col-md-12  mb-5">
                          <div className=" border rounded-2">
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
                                paginatePosition={"bottom"}
                                paginateValue={paginateCount(items)}
                                firstPage={firstPage}
                                nextPage={nextPage}
                                lastPage={lastPage}
                                prevPage={prevPage}
                              />
                            )}
                            <div className="p-3">
                              <span
                                className="btn btn-md btn-dark h-btn-primary_outline"
                                onClick={addNewItems}
                              >
                                Add Order or Product
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <Input
                            type="textarea"
                            name="note"
                            label="Note"
                            required={false}
                            placeholder="Enter notes"
                            message="*This will appear on print"
                            className=""
                            labelClass=""
                            disabled={false}
                            register={register}
                            errors={errors}
                          />
                        </div>
                        <div className="col-lg-6 mb-3">
                          <TransactionDetails />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 py-3">
                          <div
                            onClick={() => {
                              setShowFields(!showFields);
                            }}
                            className="d-flex justify-content-between custom-drop-box p-3 pointer rounded border"
                          >
                            <p>Custom Fields</p>
                            <div>
                              <i class="bi bi-chevron-down"></i>
                            </div>
                          </div>
                          {showFields && (
                            <>
                              <div className="p-3 bg-light mt-2 text-muted">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Molestias reiciendis velit
                                amet consectetur sint temporibus minima eum
                                voluptatem repellat, porro odit quaerat
                                quibusdam vitae natus totam modi libero eaque
                                suscipit cupiditate! Officiis minus voluptatibus
                                inventore atque placeat excepturi qui eligendi
                                beatae, nulla, cumque eos facere ipsum, dolorum
                                maxime magnam esse! Animi molestiae quod
                                voluptas velit saepe reprehenderit, ratione
                                minus excepturi qui dicta repudiandae debitis
                                corporis quia porro beatae assumenda cum tempora
                                illo unde deserunt quas quam. Explicabo dolorem
                                quod delectus culpa autem laboriosam
                                perspiciatis voluptates. Sapiente sed quibusdam
                                labore voluptates vel. Ad omnis, quod eos
                                aliquid molestias minus, eaque odit corrupti in
                                dignissimos sapiente aperiam enim odio facilis,
                                atque id tempore harum beatae impedit vitae.
                                Sapiente illo rerum totam repudiandae maxime
                                ullam veritatis eos vitae, doloremque at
                                doloribus, id, reiciendis itaque velit.
                                Consequuntur quisquam itaque facilis omnis,
                                reprehenderit fugiat sint deserunt totam
                                corporis nulla. Nam, distinctio cumque! Sequi
                                maiores ex est quae hic voluptatem facilis,
                                architecto aut, delectus nisi labore voluptatum
                                inventore necessitatibus? Quas ipsa aliquam sit
                                officia assumenda alias nulla commodi,
                                perferendis, dignissimos minima odio, ipsum
                                consequatur quod. Doloremque, rem dicta
                                voluptatem fuga architecto nobis quae veniam
                                deleniti, error neque quibusdam sequi unde sint
                                consequuntur, at iusto perferendis molestias.
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col-lg-12 mb-3">
                          <Input
                            type="textarea"
                            name="terms-condition"
                            label="Terms & Conditions"
                            required={false}
                            placeholder="Terms and conditions"
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
                          className="btn-md w-auto"
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
      Header: <THead className="" title="Discount" />,
      accessor: "discount",
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

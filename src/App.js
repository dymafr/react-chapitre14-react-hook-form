import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onSubmit",
  });

  // watch("name");

  function submit(values) {
    console.log(values);
  }

  console.log(errors);

  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ backgroundColor: "#fefefe", height: "100vh", width: "100%" }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-20">
          <label className="mb-5" htmlFor="name">
            Nom
          </label>
          <input
            {...register("name", {
              // disabled: true,
              minLength: {
                value: 2,
                message: "Trop court !",
              },
              // required: {
              //   value: true,
              //   message: "Le champ est obligatoire",
              // },
              // validate(value) {
              //   if (value === "Jean") {
              //     return true;
              //   } else {
              //     return "Mauvais prénom";
              //   }
              // },
            })}
            id="name"
            type="text"
          />
          {errors?.name && <p>{errors.name.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label className="mb-5" htmlFor="age">
            Age
          </label>
          <input
            {...register("age", {
              // onBlur(e) {
              //   console.log("blur age !");
              // },
              // onChange(e) {
              //   console.log("change age ! ", e);
              // },
            })}
            id="age"
            type="number"
          />
          {errors?.age && <p>{errors.age.message}</p>}
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default App;

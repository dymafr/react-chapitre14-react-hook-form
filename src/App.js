import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const yupSchema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court !")
      .max(5, "Trop long !")
      .test("isYes", "Vous n'avez pas de chance", async () => {
        const response = await fetch("https://yesno.wtf/api");
        const result = await response.json();
        console.log(result);
        return result.answer === "yes";
      }),
    // age: yup
    //   .number()
    //   .typeError("Veuillez rentrer un nombre")
    //   .min(18, "Trop jeune !"),
    password: yup
      .string()
      .required("le mot de passe est obligatoire")
      .min(5, "Mot de passe trop court !")
      .max(10, "mot de passe trop long !"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
  });

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
    resolver: yupResolver(yupSchema),
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
          <input {...register("name")} id="name" type="text" />
          {errors?.name && <p>{errors.name.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label className="mb-5" htmlFor="age">
            Age
          </label>
          <input {...register("age")} id="age" type="number" />
          {errors?.age && <p>{errors.age.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label className="mb-5" htmlFor="password">
            Mot de passe
          </label>
          <input {...register("password")} id="password" type="password" />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <div className="d-flex flex-column mb-20">
          <label className="mb-5" htmlFor="confirmPassword">
            Confirmation password
          </label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
          />
          {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default App;

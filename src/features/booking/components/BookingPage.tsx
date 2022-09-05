import Header from "@/components/Header";
import Main from "@/components/Main";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string, type SchemaOf } from "yup";
import InputText from "./InputText";

// const steps: Steps = {
//   bookingInformation: {
//     title: "Booking Information",
//     description: "Please fill up the blank fields below",
//     content: <></>,
//   },
//   payment: {
//     title: "Payment",
//     description: "Kindly follow the instructions below",
//     content: <></>,
//   },
//   completed: {
//     title: "Yay! Completed",
//     description: "",
//     content: <></>,
//   },
// };

type FieldValues = {
  name: string;
};

const fieldSchema: SchemaOf<FieldValues> = object({
  name: string().trim().min(3).required(),
});

export default function BookingPage() {
  const { register, handleSubmit, formState } = useForm<FieldValues>({
    resolver: yupResolver(fieldSchema),
    mode: "onChange",
  });

  const submit: SubmitHandler<FieldValues> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Header logoOnly />
      <Main>
        {/* <Stepper steps={steps} initialStepName="bookingInformation">
          {() => <h1>Hello World</h1>}
        </Stepper> */}
        <form onSubmit={handleSubmit(submit)} className="w-60">
          <InputText
            id="name"
            {...register("name", { required: true })}
            errorMessage={formState.errors.name?.message}
          />
        </form>
      </Main>
    </>
  );
}

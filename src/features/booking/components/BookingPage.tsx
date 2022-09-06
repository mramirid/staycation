import Header from "@/components/Header";
import Main from "@/components/Main";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObject } from "lodash-es";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { mixed, object, string } from "yup";
import InputImage from "./InputImage";
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
  image: File;
};

const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];

const fieldSchema = object({
  name: string().trim().min(3).required(),
  image: mixed<File>()
    .test("Required", "You need to provide a file", (image) => isObject(image))
    .test(
      "Image Size",
      "The file is too large",
      (image) => isObject(image) && image.size <= 2000000 /* In bytes or 2 MB*/
    )
    .test(
      "Image Type",
      "We only support PNG/JPG/JPEG",
      (image) => isObject(image) && acceptTypes.includes(image.type)
    ),
});

export default function BookingPage() {
  const { register, handleSubmit, formState, control } = useForm<FieldValues>({
    resolver: yupResolver(fieldSchema),
    mode: "onChange",
  });

  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log("SUBMITTED:", data);
  };

  return (
    <>
      <Header logoOnly />
      <Main>
        {/* <Stepper steps={steps} initialStepName="bookingInformation">
          {() => <h1>Hello World</h1>}
        </Stepper> */}
        <form className="w-60" onSubmit={handleSubmit(submit)}>
          <InputText
            id="name"
            {...register("name")}
            errorMessage={formState.errors.name?.message}
          />
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <InputImage
                containerClass="mt-1"
                accept={acceptTypes}
                id="payment-proof"
                name={field.name}
                onChange={field.onChange}
                value={field.value?.name}
                errorMessage={formState.errors.image?.message}
              />
            )}
          />
          <button
            className="app-btn app-btn-primary btn-block mt-10"
            type="submit"
          >
            Continue to Book
          </button>
        </form>
      </Main>
      <DevTool control={control} />
    </>
  );
}

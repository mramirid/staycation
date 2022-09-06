import Header from "@/components/Header";
import Main from "@/components/Main";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isNull, isUndefined } from "lodash-es";
import { useForm, type SubmitHandler } from "react-hook-form";
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
  image: FileList;
};

const acceptTypes = ["image/png", "image/jpg", "image/jpeg"];

const fieldSchema = object({
  name: string().trim().min(3).required(),
  image: mixed<FileList>()
    .test(
      "Required",
      "You need to provide a file",
      (fileList) => fileList?.length === 1
    )
    .test("Image Size", "The file is too large", (value) => {
      if (isUndefined(value)) {
        return false;
      }

      const image = value.item(0);
      if (isNull(image)) {
        return false;
      }

      return image.size <= 2_000_000; // In bytes or 2 MB
    })
    .test("Image Type", "We only support PNG/JPG/JPEG", (value) => {
      if (isUndefined(value)) {
        return false;
      }

      const image = value.item(0);
      if (isNull(image)) {
        return false;
      }

      return acceptTypes.includes(image.type);
    }),
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
          <InputImage
            containerClass="mt-1"
            accept={acceptTypes}
            id="payment-proof"
            {...register("image")}
            errorMessage={formState.errors.image?.message}
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

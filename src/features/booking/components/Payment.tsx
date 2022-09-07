import PROPERTY from "@/assets/data/property.data.json";
import { formatToUSD } from "@/utils/format";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObject } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { mixed, object, string, type InferType } from "yup";
import BOOKING_DATA from "../assets/booking.data.json";
import bcaLogo from "../assets/images/bca-logo.jpg";
import mandiriLogo from "../assets/images/mandiri-logo.jpg";
import InputImage from "./InputImage";
import InputText from "./InputText";

export default function BookingInformation() {
  return (
    <div className="grid grid-cols-[23.125rem_min-content_23.125rem] gap-x-20 justify-center">
      <PaymentDetails />
      <div className="divider divider-horizontal w-fit before:w-1px after:w-1px m-0" />
      <Form />
    </div>
  );
}

function PaymentDetails() {
  const TAX_RATE = 0.1; // 10%
  const subTotal = PROPERTY.price * BOOKING_DATA.nights;
  const grandTotal = (subTotal * TAX_RATE) / 100 + subTotal;

  return (
    <Fade delay={300} className="py-9 leading-7">
      <>
        <h5>Transfer Pembayaran:</h5>
        <p className="mt-5">Tax: {TAX_RATE * 100}%</p>
        <p className="mt-10px">Sub total: {formatToUSD(subTotal)} USD</p>
        <p className="mt-10px">Total: {formatToUSD(grandTotal)} USD</p>
        <figure className="mt-5 flex gap-x-4">
          <img
            src={bcaLogo}
            alt="Bank Central Asia"
            width={60}
            className="self-start"
          />
          <figcaption>
            <dl>
              <dd>Bank Central Asia</dd>
              <dd>2208 1996</dd>
              <dd>BuildWith Angga</dd>
            </dl>
          </figcaption>
        </figure>
        <figure className="mt-5 flex gap-x-4">
          <img
            src={mandiriLogo}
            alt="Mandiri"
            width={60}
            className="self-start"
          />
          <figcaption>
            <dl>
              <dd>Bank Mandiri</dd>
              <dd>2208 1996</dd>
              <dd>BuildWith Angga</dd>
            </dl>
          </figcaption>
        </figure>
      </>
    </Fade>
  );
}

const paymentSchema = object({
  paymentProof: mixed<File>()
    .test("Required", "You need to provide an image", (image) => {
      return isObject(image);
    })
    .test(
      "Image Type",
      "Please upload an image",
      (image) => isObject(image) && image.type.includes("image")
    )
    .test(
      "Image Size",
      "The image size is too big",
      (image) => isObject(image) && image.size <= 2_000_000 // In bytes | 2 MB
    )
    .required(),
  originBank: string().trim().required("Origin bank is required"),
  senderName: string().trim().required("Sender name is required"),
});

type PaymentValues = InferType<typeof paymentSchema>;

function Form() {
  const { register, handleSubmit, formState, control } = useForm<PaymentValues>(
    {
      resolver: yupResolver(paymentSchema),
      mode: "onChange",
    }
  );

  const submit: SubmitHandler<PaymentValues> = (data) => {
    console.log("SUBMITTED:", data);
  };

  return (
    <Fade delay={600} className="py-9 max-w-xs">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="payment-proof">Upload Bukti Transfer</label>
          <Controller
            control={control}
            name="paymentProof"
            render={({ field }) => (
              <InputImage
                containerClass="mt-2"
                id="payment-proof"
                name={field.name}
                onChange={field.onChange}
                value={field.value?.name}
                errorMessage={formState.errors.paymentProof?.message}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="origin-bank">Asal Bank</label>
          <InputText
            id="origin-bank"
            type="text"
            containerClass="mt-2"
            {...register("originBank")}
            errorMessage={formState.errors.originBank?.message}
          />
        </div>

        <div>
          <label htmlFor="name">Nama Pengirim</label>
          <InputText
            id="name"
            type="text"
            containerClass="mt-2"
            {...register("senderName")}
            errorMessage={formState.errors.senderName?.message}
          />
        </div>

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Fade>
  );
}

import PROPERTY from "@/assets/data/property.data.json";
import { formatToUSD } from "@/utils/format";
import { Fade } from "react-awesome-reveal";
import { Controller, useFormContext } from "react-hook-form";
import bcaLogo from "../../assets/images/bca-logo.jpg";
import mandiriLogo from "../../assets/images/mandiri-logo.jpg";
import type { BookingForm } from "../../types/booking-form";
import InputText from "../InputText";
import InputImage from "./InputImage";

type ContentProps = {
  duration: number;
};

export function PaymentContent(props: ContentProps) {
  return (
    <div className="grid grid-cols-[23.125rem_min-content_23.125rem] gap-x-20 justify-center">
      <PaymentDetails {...props} />
      <div className="divider divider-horizontal w-fit before:w-1px after:w-1px m-0" />
      <Form />
    </div>
  );
}

function PaymentDetails(props: ContentProps) {
  const subTotal = PROPERTY.price * props.duration;
  const TAX_RATE = 10 / 100;
  const grandTotal = subTotal * TAX_RATE + subTotal;

  return (
    <Fade className="py-9 leading-7" delay={300} triggerOnce>
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

function Form() {
  const form: BookingForm = useFormContext();

  return (
    <Fade className="py-9 max-w-xs" delay={600} triggerOnce>
      <form className="flex flex-col gap-y-5">
        <div>
          <label htmlFor="payment-proof">Upload Bukti Transfer</label>
          <Controller
            control={form.control}
            name="paymentProof"
            render={({ field }) => (
              <InputImage
                containerClass="mt-2"
                id="payment-proof"
                name={field.name}
                onChange={field.onChange}
                value={field.value?.name}
                errorMessage={form.formState.errors.paymentProof?.message}
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
            {...form.register("originBank")}
            errorMessage={form.formState.errors.originBank?.message}
          />
        </div>

        <div>
          <label htmlFor="name">Nama Pengirim</label>
          <InputText
            id="name"
            type="text"
            containerClass="mt-2"
            {...form.register("senderName")}
            errorMessage={form.formState.errors.senderName?.message}
          />
        </div>
      </form>
    </Fade>
  );
}

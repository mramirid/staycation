import InputImage from "@/components/forms/InputImage";
import InputText from "@/components/forms/InputText";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import { Controller, useFormContext } from "react-hook-form";
import { type Bank } from "../../lib/api";
import type { BookingForm } from "../../lib/schema";
import classes from "../booking-step-content.module.scss";

type ContentProps = {
  propertyPrice: number;
  duration: number;
  banks: Bank[];
};

export function PaymentContent(props: ContentProps) {
  return (
    <div className={classes.bookingStepContent}>
      <PaymentDetails
        className={clx(classes.bookingStepContent__details)}
        duration={props.duration}
        propertyPrice={props.propertyPrice}
        banks={props.banks}
      />
      <div className={classes.bookingStepContent__divider} />
      <Form className={classes.bookingStepContent__form} />
    </div>
  );
}

type PaymentDetailsProps = ContentProps & { className: string };

function PaymentDetails(props: PaymentDetailsProps) {
  const subTotal = props.propertyPrice * props.duration;
  const TAX_RATE = 10 / 100;
  const grandTotal = subTotal * TAX_RATE + subTotal;

  return (
    <Fade className={clx("leading-7", props.className)} delay={300} triggerOnce>
      <>
        <h5>Transfer Pembayaran:</h5>
        <p className="mt-5">Tax: {TAX_RATE * 100}%</p>
        <p className="mt-10px">Sub total: {formatToUSD(subTotal)} USD</p>
        <p className="mt-10px">Total: {formatToUSD(grandTotal)} USD</p>
        {props.banks.map((bank) => (
          <figure className="mt-5 flex gap-x-4" key={bank._id}>
            <img
              src={bank.logoUrl}
              alt={bank.name}
              width={60}
              className="self-start"
            />
            <figcaption>
              <dl>
                <dd>{bank.name}</dd>
                <dd>{bank.accountNumbers}</dd>
                <dd>{bank.accountHolderName}</dd>
              </dl>
            </figcaption>
          </figure>
        ))}
      </>
    </Fade>
  );
}

type FormProps = {
  className: string;
};

function Form({ className }: FormProps) {
  const form: BookingForm = useFormContext();

  return (
    <Fade className={className} delay={600} triggerOnce>
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
            {...form.register("originBankName")}
            errorMessage={form.formState.errors.originBankName?.message}
          />
        </div>

        <div>
          <label htmlFor="name">Nama Pengirim</label>
          <InputText
            id="name"
            type="text"
            containerClass="mt-2"
            {...form.register("accountHolderName")}
            errorMessage={form.formState.errors.accountHolderName?.message}
          />
        </div>
      </form>
    </Fade>
  );
}

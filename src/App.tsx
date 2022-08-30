import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import InputNumber from "./features/detail-property/components/InputNumber";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

function Test() {
  type IFormInputs = { night: number };

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      night: 1,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[20rem] h-[30rem] border-red-800 border"
    >
      <Controller
        control={control}
        name="night"
        rules={{ required: true }}
        render={({ field }) => (
          <InputNumber
            name={field.name}
            value={field.value}
            suffix={{ value: "night", pluralValue: "nights" }}
            min={1}
            max={3}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
}

import { useFormik } from "formik";
import { z } from "zod";
import Cookies from "js-cookie";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { zSignUpTrpcInput } from "@cookipedia/backend/src/router/signUp/input";
import { Alert } from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { getAllRecipiesRoute } from "../../lib/routes";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();

  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: "custom",
              message: "Password must be the same",
              path: ["passwordAgain"],
            });
          }
        }),
    ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signUp.mutateAsync(values);
        Cookies.set("token", token, { expires: 99999 });
        void trpcUtils.invalidate();
        navigate(getAllRecipiesRoute());
      } catch (
        error: any // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
        setSubmittingError(error.message);
      }
    },
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

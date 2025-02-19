"use client";

import { Field } from "@/Components/UI/field";
import { PinInput } from "@/Components/UI/pin-input";
import { toaster } from "@/Components/UI/toaster";
import UserService from "@/services/UserService";
import { Box, Button, Card } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  pin: z
    .array(z.string().min(1), { required_error: "Pin is required" })
    .length(6, { message: "Pin must be 4 digits long" }),
});

type FormValues = z.infer<typeof formSchema>;

const EmailVerify = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const pinNumber = Number(data.pin.join(""));
    UserService.verify({
      params: {
        verification_otp: pinNumber,
      },
    })
      .then(() => {
        navigate("/login");
        toaster.create({});
      })
      .catch((data) => {
        toaster.create({
          title: "Verfication Failed",
          description: data.response.data.message,
          type: "error",
        });
      });
  });

  return (
    <Box className="flex justify-center items-center" mt={200}>
      <Card.Root shadow={"lg"}>
        <form onSubmit={onSubmit}>
          <Card.Header fontSize={"2xl"}>Enter the OTP</Card.Header>
          <Card.Description ml={6} mt={4}>
            Enter the OTP recieved to your e-mail!
          </Card.Description>
          <Card.Body mt={5}>
            <Field
              invalid={!!formState.errors.pin}
              errorText={formState.errors.pin?.message}
            >
              <Controller
                control={control}
                name="pin"
                render={({ field }) => (
                  <PinInput
                    count={6}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
            </Field>
          </Card.Body>
          <Card.Footer className="flex justify-center" m={5}>
            <Button type="submit">Submit</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Box>
  );
};

export default EmailVerify;

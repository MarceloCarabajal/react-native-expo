import { object, string, ref } from "yup";

export const signUpSchema = object().shape({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password"), null], "Passwords must match"),
});

export const loginSchema = object().shape({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
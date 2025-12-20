import React, { useState } from "react";
import { api } from "../../api";

export default function StudentCreate() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.firstName.trim()) return "First name is required";
        if (!form.email.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await api.post("/users/create-student", { email: form.email });


            const data = res.data;
            if (!res.success) throw new Error(data.message || "Failed to create student");

            setSuccess("Student created successfully ✅");
            setForm({ firstName: "", lastName: "", email: "", phone: "" });
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    const isSubmitDisabled = !form.firstName.trim() || !form.email.trim();

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-4 py-10">
            <div className="mx-auto w-full max-w-xl">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Create Student
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Add a new student record. Email is required.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* Alerts */}
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <div className="font-medium">Something needs fixing</div>
                            <div className="mt-1">{error}</div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            <div className="font-medium">Success</div>
                            <div className="mt-1">{success}</div>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Name row */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">
                                    First name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="firstName"
                                    placeholder="e.g. Ayesha"
                                    value={form.firstName}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">
                                    Last name
                                </label>
                                <input
                                    name="lastName"
                                    placeholder="e.g. Rahman"
                                    value={form.lastName}
                                    onChange={onChange}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="e.g. student@mail.com"
                                value={form.email}
                                onChange={onChange}
                                required
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                            />
                            <p className="text-xs text-slate-500">
                                We’ll use this email as the unique identifier.
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Phone</label>
                            <input
                                name="phone"
                                placeholder="e.g. 01XXXXXXXXX"
                                value={form.phone}
                                onChange={onChange}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setSuccess("");
                                    setForm({ firstName: "", lastName: "", email: "", phone: "" });
                                }}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                                Create Student
                            </button>
                        </div>

                        {/* Footer note */}
                        <div className="pt-2 text-xs text-slate-500">
                            Tip: In backend, enforce <span className="font-medium">unique email</span>{" "}
                            with a MongoDB unique index.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    subscribe: false,
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.role) newErrors.role = "Choose a role.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
    } else {
      setSubmittedData(null);
    }
  }

  function handleReset() {
    setFormData({
      username: "",
      email: "",
      password: "",
      subscribe: false,
      role: "",
    });
    setErrors({});
    setSubmittedData(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">
          Create an account
        </h1>
        <p className="text-slate-500 text-sm mb-6"></p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.username ? "border-red-400" : "border-slate-300"
              }`}
              placeholder="jane_doe"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.email ? "border-red-400" : "border-slate-300"
              }`}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.password ? "border-red-400" : "border-slate-300"
              }`}
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.role ? "border-red-400" : "border-slate-300"
              }`}
            >
              <option value="">Select a role</option>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="subscribe"
              name="subscribe"
              type="checkbox"
              checked={formData.subscribe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
            />
            <label htmlFor="subscribe" className="text-sm text-slate-700">
              Send me
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create account
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">
              Submitted data
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Username</dt>
                <dd className="text-slate-800 font-medium">
                  {submittedData.username}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Email</dt>
                <dd className="text-slate-800 font-medium">
                  {submittedData.email}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Password</dt>
                <dd className="text-slate-800 font-medium">
                  {"•".repeat(submittedData.password.length)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Role</dt>
                <dd className="text-slate-800 font-medium capitalize">
                  {submittedData.role}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Subscribed</dt>
                <dd className="text-slate-800 font-medium">
                  {submittedData.subscribe ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

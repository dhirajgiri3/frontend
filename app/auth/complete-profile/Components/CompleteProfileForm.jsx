// components/CompleteProfileForm.jsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiImage,
  FiPlusCircle,
  FiMinusCircle,
  FiCheck,
  FiAlertCircle,
  FiGlobe,
  FiBriefcase,
  FiLock,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { useAuth } from "@/app/Contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";

function CompleteProfileForm() {
  const { completeProfile, error: authError, clearError, user } = useAuth();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    birthDate: user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
    profilePicture: user?.profilePicture || "",
    bio: user?.bio || "",
    occupation: user?.occupation || "",
    company: user?.company || "",
    website: user?.website || "",
    languages: user?.languages || [],
    skills: user?.skills || [],
    interests: user?.interests || [],
    preferences: {
      language: user?.preferences.language || "en",
      currency: user?.preferences.currency || "USD",
      notifications: user?.preferences.notifications || {
        email: true,
        sms: true,
        push: true,
      },
      marketingEmails: user?.preferences.marketingEmails || true,
      privacy: user?.preferences.privacy || {
        profileVisibility: "public",
        showEmail: true,
        showPhone: true,
      },
      theme: user?.preferences.theme || "light",
      timezone:
        user?.preferences.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    addresses:
      user?.addresses.length > 0
        ? user.addresses
        : [
            {
              type: "Home",
              fullName:
                user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "",
              street: "",
              apartment: "",
              landmark: "",
              city: "",
              state: "",
              postalCode: "",
              country: "",
              phone: "",
              alternatePhone: "",
              deliveryInstructions: "",
              isDefault: true,
            },
          ],
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Clear auth error when component unmounts or when form data changes
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  useEffect(() => {
    if (authError) {
      clearError();
    }
  }, [formData, authError, clearError]);

  const totalSteps = 4;

  const labelClasses =
    "block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2";
  const inputClasses =
    "block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm px-4 py-3";
  const cardClasses =
    "bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-primary/20 transition-all duration-300";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const stepVariants = {
    enter: { x: "30%", opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "-30%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.firstName?.trim())
        errors.firstName = "First name is required";
      if (!formData.lastName?.trim()) errors.lastName = "Last name is required";
      if (!formData.email?.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "Invalid email format";
      if (!formData.phone?.trim()) errors.phone = "Phone number is required";
      else if (!/^\+[1-9]\d{1,14}$/.test(formData.phone))
        errors.phone =
          "Phone number must be in E.164 format (e.g., +1234567890)";
      if (!formData.gender) errors.gender = "Gender is required";
      if (!formData.birthDate) errors.birthDate = "Birth date is required";
    }

    if (step === 2) {
      if (!formData.bio?.trim()) errors.bio = "Bio is required";
      if (formData.website && !/^https?:\/\/.+/.test(formData.website))
        errors.website = "Website must be a valid URL";
      if (
        formData.profilePicture &&
        !/^https?:\/\/.+/.test(formData.profilePicture)
      )
        errors.profilePicture = "Profile picture must be a valid URL";

      // No socialLinks to validate
    }

    if (step === 3) {
      // Validate languages array
      if (!formData.languages?.length) {
        errors.languages = "At least one language is required";
      } else {
        const invalidLanguages = formData.languages.filter(
          (lang) => !lang.trim()
        );
        if (invalidLanguages.length > 0) {
          errors.languages = "All languages must be valid";
        }
      }

      // Validate skills array
      if (!formData.skills?.length) {
        errors.skills = "At least one skill is required";
      } else {
        const invalidSkills = formData.skills.filter((skill) => !skill.trim());
        if (invalidSkills.length > 0) {
          errors.skills = "All skills must be valid";
        }
      }

      // Validate interests array
      if (formData.interests?.length) {
        const invalidInterests = formData.interests.filter(
          (interest) => !interest.trim()
        );
        if (invalidInterests.length > 0) {
          errors.interests = "All interests must be valid";
        }
      }

      // Validate currency
      if (!formData.preferences?.currency) {
        errors.currency = "Currency preference is required";
      }

      // Validate profile visibility
      if (
        !formData.preferences?.privacy?.profileVisibility ||
        !["public", "private"].includes(
          formData.preferences.privacy.profileVisibility
        )
      ) {
        errors.profileVisibility =
          "Profile visibility must be either public or private";
      }

      // Validate theme
      if (
        !formData.preferences?.theme ||
        !["light", "dark"].includes(formData.preferences.theme)
      ) {
        errors.theme = "Theme must be either light or dark";
      }

      // Validate timezone
      if (!formData.preferences?.timezone) {
        errors.timezone = "Timezone is required";
      }
    }

    if (step === 4) {
      const addressErrors = formData.addresses.map((address, index) => {
        const addressError = {};
        if (!address.type) addressError.type = "Address type is required";
        if (!address.fullName?.trim())
          addressError.fullName = "Full name is required";
        if (!address.street?.trim())
          addressError.street = "Street address is required";
        if (!address.city?.trim()) addressError.city = "City is required";
        if (!address.state?.trim()) addressError.state = "State is required";
        if (!address.country?.trim())
          addressError.country = "Country is required";
        if (!address.postalCode?.trim())
          addressError.postalCode = "Postal code is required";
        if (!address.phone?.trim())
          addressError.phone = "Primary phone number is required";

        if (
          address.postalCode &&
          !/^[0-9A-Z]{3,10}$/i.test(address.postalCode)
        ) {
          addressError.postalCode = "Please enter a valid postal code";
        }

        if (address.phone && !/^\+[1-9]\d{1,14}$/.test(address.phone)) {
          addressError.phone =
            "Phone number must be in E.164 format (e.g., +1234567890)";
        }

        if (
          address.alternatePhone &&
          !/^\+[1-9]\d{1,14}$/.test(address.alternatePhone)
        ) {
          addressError.alternatePhone =
            "Alternate phone must be in E.164 format (e.g., +1234567890)";
        }

        return Object.keys(addressError).length ? addressError : null;
      });

      if (addressErrors.some((error) => error !== null)) {
        errors.addresses = addressErrors;
      }

      if (!formData.addresses.some((addr) => addr.isDefault)) {
        errors.defaultAddress = "At least one address must be set as default";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear any existing errors when user starts typing
    clearError();
    setFormErrors({});

    if (name.startsWith("preferences.notifications.")) {
      const notificationType = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: {
            ...prev.preferences.notifications,
            [notificationType]: checked,
          },
        },
      }));
    } else if (name.startsWith("preferences.privacy.")) {
      const privacyField = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          privacy: {
            ...prev.preferences.privacy,
            [privacyField]: checked || value,
          },
        },
      }));
    } else if (name.startsWith("preferences.")) {
      const preferenceField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [preferenceField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayInput = (field, value) => {
    clearError();
    const trimmedValue = value.trim();
    if (trimmedValue && !formData[field].includes(trimmedValue)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], trimmedValue],
      }));
    }
  };

  const removeArrayItem = (field, index) => {
    clearError();
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleAddressChange = (index, e) => {
    clearError();
    const { name, value, type, checked } = e.target;
    const newAddresses = [...formData.addresses];
    newAddresses[index] = {
      ...newAddresses[index],
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "isDefault" && checked) {
      newAddresses.forEach((addr, i) => {
        if (i !== index) addr.isDefault = false;
      });
    }

    setFormData((prev) => ({
      ...prev,
      addresses: newAddresses,
    }));
  };

  const addAddress = () => {
    clearError();
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          type: "Home",
          fullName: `${prev.firstName} ${prev.lastName}`,
          street: "",
          apartment: "",
          landmark: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phone: "",
          alternatePhone: "",
          deliveryInstructions: "",
          isDefault: prev.addresses.length === 0,
        },
      ],
    }));
  };

  const removeAddress = (index) => {
    clearError();
    setFormData((prev) => {
      const newAddresses = prev.addresses.filter((_, i) => i !== index);

      if (prev.addresses[index].isDefault && newAddresses.length > 0) {
        newAddresses[0].isDefault = true;
      }

      return {
        ...prev,
        addresses: newAddresses,
      };
    });
  };

  const nextStep = () => {
    clearError();
    if (validateStep(currentStep)) {
      setIsAnimating(true);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevStep = () => {
    clearError();
    setIsAnimating(true);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validateStep(currentStep)) return;

    try {
      setLoading(true);
      const success = await completeProfile(formData);
      if (success) {
        // Handle success, e.g., redirect or show a success message
        router.push("/profile");
      }
    } catch (error) {
      console.error("Profile completion failed:", error);
      // Check if error.response.data.errors exists
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setFormErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setFormErrors((prev) => ({
            ...prev,
            submit: error.response.data.message,
          }));
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          submit: "Failed to complete profile. Please try again.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Your Profile
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's get to know you better! Please fill in your details below to
            personalize your experience.
          </p>

          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                    step === currentStep
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : step < currentStep
                      ? "bg-primary/20 text-primary"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step}
                </motion.div>
                {step < 4 && (
                  <div
                    className={`w-20 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step < currentStep ? "bg-primary/30" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className={`${cardClasses} backdrop-blur-sm bg-white/80`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`space-y-8 ${
                isAnimating ? "pointer-events-none" : ""
              }`}
            >
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>
                      <FiUser className="text-primary" /> First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.firstName
                          ? "border-red-500 ring-red-100"
                          : ""
                      }`}
                      placeholder="John"
                    />
                    {formErrors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.firstName}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className={labelClasses}>
                      <FiUser className="text-primary" /> Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.lastName ? "border-red-500 ring-red-100" : ""
                      }`}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.lastName}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      <FiMail className="text-primary" /> Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.email ? "border-red-500 ring-red-100" : ""
                      }`}
                      placeholder="john.doe@example.com"
                    />
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.email}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      <FiPhone className="text-primary" /> Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+919876543210"
                      required
                      pattern="^\+[1-9]\d{1,14}$"
                      title="Phone number must be in E.164 format (e.g., +1234567890)"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.phone ? "border-red-500 ring-red-100" : ""
                      }`}
                    />
                    {formErrors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.phone}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className={labelClasses}>
                      <BsGenderAmbiguous className="text-primary" /> Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.gender ? "border-red-500 ring-red-100" : ""
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">
                        Prefer not to say
                      </option>
                    </select>
                    {formErrors.gender && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.gender}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="birthDate" className={labelClasses}>
                      <FiCalendar className="text-primary" /> Birth Date
                    </label>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      required
                      max={new Date().toISOString().split("T")[0]}
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.birthDate
                          ? "border-red-500 ring-red-100"
                          : ""
                      }`}
                    />
                    {formErrors.birthDate && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.birthDate}
                      </motion.p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label htmlFor="bio" className={labelClasses}>
                      <FiUser className="text-primary" /> Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.bio ? "border-red-500 ring-red-100" : ""
                      }`}
                      placeholder="Tell us about yourself..."
                      required
                    />
                    {formErrors.bio && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.bio}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="occupation" className={labelClasses}>
                      <FiBriefcase className="text-primary" /> Occupation
                    </label>
                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.occupation
                          ? "border-red-500 ring-red-100"
                          : ""
                      }`}
                      placeholder="Software Engineer"
                      required
                    />
                    {formErrors.occupation && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.occupation}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      <FiBriefcase className="text-primary" /> Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className={labelClasses}>
                      <FiGlobe className="text-primary" /> Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.website ? "border-red-500 ring-red-100" : ""
                      }`}
                      placeholder="https://example.com"
                    />
                    {formErrors.website && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.website}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="profilePicture" className={labelClasses}>
                      <FiImage className="text-primary" /> Profile Picture URL
                    </label>
                    <input
                      id="profilePicture"
                      name="profilePicture"
                      type="url"
                      value={formData.profilePicture}
                      onChange={handleChange}
                      className={`${inputClasses} ${
                        formErrors.profilePicture
                          ? "border-red-500 ring-red-100"
                          : ""
                      }`}
                      placeholder="https://example.com/profile.jpg"
                    />
                    {formErrors.profilePicture && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.profilePicture}
                      </motion.p>
                    )}
                  </div>

                  {/* Removed Social Links Section */}
                </div>
              )}

              {/* Step 3: Skills and Preferences */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  {/* Interests */}
                  <div>
                    <label className={labelClasses}>Interests</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.interests.map((interest, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                        >
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeArrayItem("interests", index)}
                            className="hover:text-red-500"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="interestsInput"
                        placeholder="Add an interest..."
                        className={inputClasses}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleArrayInput("interests", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                    {formErrors.interests && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.interests}
                      </motion.p>
                    )}
                  </div>

                  {/* Languages */}
                  <div>
                    <label className={labelClasses}>Languages</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.languages.map((language, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                        >
                          {language}
                          <button
                            type="button"
                            onClick={() => removeArrayItem("languages", index)}
                            className="hover:text-red-500"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="languagesInput"
                        placeholder="Add a language..."
                        className={inputClasses}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleArrayInput("languages", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                    {formErrors.languages && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.languages}
                      </motion.p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className={labelClasses}>Skills</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeArrayItem("skills", index)}
                            className="hover:text-red-500"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="skillsInput"
                        placeholder="Add a skill..."
                        className={inputClasses}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleArrayInput("skills", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                    {formErrors.skills && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle />
                        {formErrors.skills}
                      </motion.p>
                    )}
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Language Preference */}
                    <div>
                      <label
                        htmlFor="preferences.language"
                        className={labelClasses}
                      >
                        <FiGlobe className="text-primary" /> Language Preference
                      </label>
                      <select
                        id="preferences.language"
                        name="preferences.language"
                        value={formData.preferences.language}
                        onChange={handleChange}
                        className={`${inputClasses} ${
                          formErrors.language
                            ? "border-red-500 ring-red-100"
                            : ""
                        }`}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                        <option value="ru">Russian</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        {/* Add more languages as needed */}
                      </select>
                      {formErrors.language && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center gap-1"
                        >
                          <FiAlertCircle />
                          {formErrors.language}
                        </motion.p>
                      )}
                    </div>

                    {/* Currency Preference */}
                    <div>
                      <label
                        htmlFor="preferences.currency"
                        className={labelClasses}
                      >
                        <FiGlobe className="text-primary" /> Currency Preference
                      </label>
                      <select
                        id="preferences.currency"
                        name="preferences.currency"
                        value={formData.preferences.currency}
                        onChange={handleChange}
                        className={`${inputClasses} ${
                          formErrors.currency
                            ? "border-red-500 ring-red-100"
                            : ""
                        }`}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                        <option value="CNY">CNY</option>
                        <option value="INR">INR</option>
                        {/* Add more currencies as needed */}
                      </select>
                      {formErrors.currency && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center gap-1"
                        >
                          <FiAlertCircle />
                          {formErrors.currency}
                        </motion.p>
                      )}
                    </div>

                    {/* Theme Preference */}
                    <div>
                      <label className={labelClasses}>Theme Preference</label>
                      <div className="flex items-center gap-4">
                        <motion.label
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="preferences.theme"
                            value="light"
                            checked={formData.preferences.theme === "light"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                            {formData.preferences.theme === "light" && (
                              <FiSun className="text-yellow-500" />
                            )}
                          </div>
                          <span className="text-sm">Light</span>
                        </motion.label>

                        <motion.label
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="preferences.theme"
                            value="dark"
                            checked={formData.preferences.theme === "dark"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                            {formData.preferences.theme === "dark" && (
                              <FiMoon className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">Dark</span>
                        </motion.label>
                      </div>
                      {formErrors.theme && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center gap-1"
                        >
                          <FiAlertCircle />
                          {formErrors.theme}
                        </motion.p>
                      )}
                    </div>

                    {/* Privacy Settings */}
                    <div className="md:col-span-2">
                      <label className={labelClasses}>
                        <FiLock className="text-primary" /> Privacy Settings
                      </label>
                      <div className="space-y-4">
                        {/* Profile Visibility */}
                        <div>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="preferences.privacy.profileVisibility"
                              value="public"
                              checked={
                                formData.preferences.privacy
                                  .profileVisibility === "public"
                              }
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-primary"
                            />
                            <span className="text-sm">Public Profile</span>
                          </label>
                          <label className="flex items-center gap-2 mt-2">
                            <input
                              type="radio"
                              name="preferences.privacy.profileVisibility"
                              value="private"
                              checked={
                                formData.preferences.privacy
                                  .profileVisibility === "private"
                              }
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-primary"
                            />
                            <span className="text-sm">Private Profile</span>
                          </label>
                          {formErrors.profileVisibility && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.profileVisibility}
                            </motion.p>
                          )}
                        </div>

                        {/* Show Email */}
                        <div>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="preferences.privacy.showEmail"
                              checked={formData.preferences.privacy.showEmail}
                              onChange={handleChange}
                              className="form-checkbox h-5 w-5 text-primary"
                            />
                            <span className="text-sm">Show Email Address</span>
                          </label>
                        </div>

                        {/* Show Phone */}
                        <div>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="preferences.privacy.showPhone"
                              checked={formData.preferences.privacy.showPhone}
                              onChange={handleChange}
                              className="form-checkbox h-5 w-5 text-primary"
                            />
                            <span className="text-sm">Show Phone Number</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Emails */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="preferences.marketingEmails"
                          checked={formData.preferences.marketingEmails}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-primary"
                        />
                        <span className="text-sm">
                          Receive Marketing Emails
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Address Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {formData.addresses?.map((address, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:border-primary/30 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                          <IoLocationOutline className="text-primary text-xl" />
                          Address {index + 1}
                        </h4>
                        {formData.addresses.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => removeAddress(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FiMinusCircle className="text-xl" />
                          </motion.button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Type</label>
                          <select
                            name="type"
                            value={address.type}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.type
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                          {formErrors.addresses &&
                            formErrors.addresses[index] && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-600 flex items-center gap-1"
                              >
                                <FiAlertCircle />
                                {formErrors.addresses[index].geolocation &&
                                  formErrors.addresses[index].geolocation}
                                {/* Display other address-specific errors as needed */}
                              </motion.p>
                            )}
                        </div>

                        <div>
                          <label className={labelClasses}>Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={address.fullName}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.fullName
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="John Doe"
                          />
                          {formErrors.addresses?.[index]?.fullName && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].fullName}
                            </motion.p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className={labelClasses}>Street Address</label>
                          <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.street
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="1234 Main St"
                          />
                          {formErrors.addresses?.[index]?.street && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].street}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>
                            Apartment/Suite
                          </label>
                          <input
                            type="text"
                            name="apartment"
                            value={address.apartment}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={inputClasses}
                            placeholder="Apt 101"
                          />
                        </div>

                        <div>
                          <label className={labelClasses}>Landmark</label>
                          <input
                            type="text"
                            name="landmark"
                            value={address.landmark}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={inputClasses}
                            placeholder="Near Central Park"
                          />
                        </div>

                        <div>
                          <label className={labelClasses}>City</label>
                          <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.city
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="New York"
                          />
                          {formErrors.addresses?.[index]?.city && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].city}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>State</label>
                          <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.state
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="NY"
                          />
                          {formErrors.addresses?.[index]?.state && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].state}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>Country</label>
                          <input
                            type="text"
                            name="country"
                            value={address.country}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.country
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="United States"
                          />
                          {formErrors.addresses?.[index]?.country && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].country}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.postalCode
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="10001"
                          />
                          {formErrors.addresses?.[index]?.postalCode && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].postalCode}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>Primary Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={address.phone}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.phone
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            required
                            placeholder="+919876543210"
                          />
                          {formErrors.addresses?.[index]?.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].phone}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className={labelClasses}>
                            Alternate Phone
                          </label>
                          <input
                            type="tel"
                            name="alternatePhone"
                            value={address.alternatePhone}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={`${inputClasses} ${
                              formErrors.addresses?.[index]?.alternatePhone
                                ? "border-red-500 ring-red-100"
                                : ""
                            }`}
                            placeholder="+919876543211"
                          />
                          {formErrors.addresses?.[index]?.alternatePhone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.addresses[index].alternatePhone}
                            </motion.p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className={labelClasses}>
                            Delivery Instructions
                          </label>
                          <textarea
                            name="deliveryInstructions"
                            value={address.deliveryInstructions}
                            onChange={(e) => handleAddressChange(index, e)}
                            className={inputClasses}
                            placeholder="Leave at the front desk if not available."
                            rows="3"
                          />
                        </div>

                        {/* Set as Default Address */}
                        <div className="md:col-span-2">
                          <label className="relative inline-flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              name="isDefault"
                              checked={address.isDefault}
                              onChange={(e) => handleAddressChange(index, e)}
                              className="sr-only"
                            />
                            <div
                              className={`w-14 h-8 bg-gray-200 rounded-2xl peer transition-all duration-300 ${
                                address.isDefault ? "bg-primary" : ""
                              } relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700`}
                            >
                              <div
                                className={`absolute top-1 w-6 h-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 flex items-center justify-center ${
                                  address.isDefault
                                    ? "translate-x-7 rotate-180"
                                    : "translate-x-1"
                                } group-hover:scale-110`}
                              >
                                <div
                                  className="w-3 h-3 rounded-full bg-primary-light opacity-0 transition-opacity duration-300"
                                  style={{
                                    opacity: address.isDefault ? "1" : "0",
                                  }}
                                />
                              </div>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                              Set as Default Address
                            </span>
                          </label>
                          {formErrors.defaultAddress && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-sm text-red-600 flex items-center gap-1"
                            >
                              <FiAlertCircle />
                              {formErrors.defaultAddress}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgb(249 250 251)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={addAddress}
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all duration-200 flex items-center justify-center gap-3 font-medium"
                  >
                    <FiPlusCircle className="text-xl" />
                    Add New Address
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex justify-between mt-12 pt-6 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentStep > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                ← Back
              </motion.button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-auto px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 flex items-center gap-2 font-medium shadow-lg shadow-primary/20"
              >
                Continue →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className={`ml-auto px-8 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium shadow-lg ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark shadow-primary/20"
                }`}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <FiCheck className="text-xl" />
                  </>
                )}
              </motion.button>
            )}
          </motion.div>

          {/* Display submission errors */}
          {formErrors.submit && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-600 flex items-center gap-1 justify-center"
            >
              <FiAlertCircle />
              {formErrors.submit}
            </motion.p>
          )}

          {/* Display authentication errors */}
          {authError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-600 flex items-center gap-1 justify-center"
            >
              <FiAlertCircle />
              {authError}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default CompleteProfileForm;

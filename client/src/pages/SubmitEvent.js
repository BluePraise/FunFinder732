import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";
export default function SubmitEvent() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        eventName: "",
        date: "",
        time: "",
        location: "",
        description: "",
        category: "",
        cost: "",
        contactEmail: "",
        website: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual submission logic
        console.log("Event submitted:", formData);
        setSubmitted(true);
    };
    if (submitted) {
        return (_jsxs("div", { className: "max-w-2xl mx-auto text-center py-12", children: [_jsx(CheckCircle, { className: "h-16 w-16 text-green-500 mx-auto mb-4" }), _jsx("h1", { className: "text-3xl font-bold mb-4", children: "Thank You!" }), _jsx("p", { className: "text-lg text-muted-foreground mb-6", children: "Your event has been submitted for review. We'll add it to FunFinder732 once approved." }), _jsx(Button, { onClick: () => { setSubmitted(false); setFormData({ eventName: "", date: "", time: "", location: "", description: "", category: "", cost: "", contactEmail: "", website: "" }); }, children: "Submit Another Event" })] }));
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Submit an Event" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Know of a family-friendly event in Monmouth County? Share it with the community!" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Event Name *" }), _jsx("input", { type: "text", name: "eventName", required: true, value: formData.eventName, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "e.g., Spring Family Festival" })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Date *" }), _jsx("input", { type: "date", name: "date", required: true, value: formData.date, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Time" }), _jsx("input", { type: "text", name: "time", value: formData.time, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "e.g., 10:00 AM - 2:00 PM" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Location *" }), _jsx("input", { type: "text", name: "location", required: true, value: formData.location, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "e.g., Thompson Park, Lincroft" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Category *" }), _jsxs("select", { name: "category", required: true, value: formData.category, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", children: [_jsx("option", { value: "", children: "Select a category" }), _jsx("option", { value: "Arts & Crafts", children: "Arts & Crafts" }), _jsx("option", { value: "Sports", children: "Sports" }), _jsx("option", { value: "Nature", children: "Nature" }), _jsx("option", { value: "Music", children: "Music" }), _jsx("option", { value: "Education", children: "Education" }), _jsx("option", { value: "Festival", children: "Festival" }), _jsx("option", { value: "Holiday", children: "Holiday" }), _jsx("option", { value: "Other", children: "Other" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Cost" }), _jsx("input", { type: "text", name: "cost", value: formData.cost, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "e.g., Free, $10/family, $5/person" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Description *" }), _jsx("textarea", { name: "description", required: true, value: formData.description, onChange: handleChange, rows: 4, className: "w-full px-4 py-2 rounded-lg border bg-background resize-none", placeholder: "Tell us about the event..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Event Website" }), _jsx("input", { type: "url", name: "website", value: formData.website, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "https://..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Your Email *" }), _jsx("input", { type: "email", name: "contactEmail", required: true, value: formData.contactEmail, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border bg-background", placeholder: "your@email.com" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "We'll only use this to contact you about your submission." })] }), _jsxs(Button, { type: "submit", className: "w-full", size: "lg", children: [_jsx(Send, { className: "h-4 w-4 mr-2" }), "Submit Event"] })] })] }));
}

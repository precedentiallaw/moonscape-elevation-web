
import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingCalendarProps {
  onBooking?: (booking: BookingData) => void;
  className?: string;
}

interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  message: string;
}

export const BookingCalendar = ({ onBooking, className = "" }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const propertyTypes = [
    "Luxury Villa", "Penthouse", "Apartment", 
    "Townhouse", "Commercial Property"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData: BookingData = {
      date: selectedDate,
      time: selectedTime,
      ...formData
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onBooking?.(bookingData);
    setIsSubmitting(false);
    
    // Reset form
    setSelectedDate("");
    setSelectedTime("");
    setFormData({
      name: "",
      phone: "",
      email: "",
      propertyType: "",
      message: ""
    });
  };

  const updateFormData = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-serif font-semibold text-slate-900">Schedule a Viewing</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Preferred Date
          </label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-slate-50/50 border-slate-200 rounded-xl"
            required
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Preferred Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className={`text-sm transition-all duration-300 ${
                  selectedTime === time 
                    ? "bg-amber-600 text-white hover:bg-amber-700" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Your full name"
              className="bg-slate-50/50 border-slate-200 rounded-xl"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="+971 XX XXX XXXX"
              className="bg-slate-50/50 border-slate-200 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="your.email@domain.com"
            className="bg-slate-50/50 border-slate-200 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Property Interest
          </label>
          <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
            <SelectTrigger className="bg-slate-50/50 border-slate-200 rounded-xl">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Message (Optional)</label>
          <Textarea
            value={formData.message}
            onChange={(e) => updateFormData('message', e.target.value)}
            placeholder="Any specific preferences or questions..."
            className="bg-slate-50/50 border-slate-200 rounded-xl min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Scheduling...</span>
            </div>
          ) : (
            "Schedule Viewing"
          )}
        </Button>
      </form>
    </div>
  );
};

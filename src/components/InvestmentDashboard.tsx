
import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, PieChart, BarChart3, Calculator, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvestmentDashboardProps {
  className?: string;
}

interface ROICalculation {
  propertyValue: number;
  downPayment: number;
  loanAmount: number;
  rentalYield: number;
  monthlyRental: number;
  roi: number;
  breakeven: number;
}

export const InvestmentDashboard = ({ className = "" }: InvestmentDashboardProps) => {
  const [calculatorData, setCalculatorData] = useState({
    propertyValue: 2500000,
    downPaymentPercent: 25,
    interestRate: 3.5,
    loanTerm: 25,
    expectedRental: 15000
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [marketData] = useState({
    averageYield: 6.8,
    priceGrowth: 4.2,
    demandIndex: 85,
    supplyIndex: 72
  });

  useEffect(() => {
    calculateROI();
  }, [calculatorData]);

  const calculateROI = () => {
    const { propertyValue, downPaymentPercent, expectedRental, interestRate, loanTerm } = calculatorData;
    
    const downPayment = (propertyValue * downPaymentPercent) / 100;
    const loanAmount = propertyValue - downPayment;
    const monthlyInterest = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) / (Math.pow(1 + monthlyInterest, numPayments) - 1);
    
    const netMonthlyIncome = expectedRental - monthlyPayment;
    const annualNetIncome = netMonthlyIncome * 12;
    const roi = (annualNetIncome / downPayment) * 100;
    const rentalYield = (expectedRental * 12 / propertyValue) * 100;
    const breakeven = downPayment / annualNetIncome;

    setCalculation({
      propertyValue,
      downPayment,
      loanAmount,
      rentalYield,
      monthlyRental: expectedRental,
      roi,
      breakeven
    });
  };

  const updateCalculatorData = (key: keyof typeof calculatorData, value: number) => {
    setCalculatorData(prev => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-serif font-semibold text-slate-900">Investment Calculator</h3>
        </div>

        {/* Calculator Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Property Value (AED)</label>
            <Input
              type="number"
              value={calculatorData.propertyValue}
              onChange={(e) => updateCalculatorData('propertyValue', Number(e.target.value))}
              className="bg-slate-50/50 border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Down Payment (%)</label>
            <Select 
              value={calculatorData.downPaymentPercent.toString()} 
              onValueChange={(value) => updateCalculatorData('downPaymentPercent', Number(value))}
            >
              <SelectTrigger className="bg-slate-50/50 border-slate-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="40">40%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Expected Rental (AED/month)</label>
            <Input
              type="number"
              value={calculatorData.expectedRental}
              onChange={(e) => updateCalculatorData('expectedRental', Number(e.target.value))}
              className="bg-slate-50/50 border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Interest Rate (%)</label>
            <Input
              type="number"
              step="0.1"
              value={calculatorData.interestRate}
              onChange={(e) => updateCalculatorData('interestRate', Number(e.target.value))}
              className="bg-slate-50/50 border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Loan Term (years)</label>
            <Select 
              value={calculatorData.loanTerm.toString()} 
              onValueChange={(value) => updateCalculatorData('loanTerm', Number(value))}
            >
              <SelectTrigger className="bg-slate-50/50 border-slate-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 years</SelectItem>
                <SelectItem value="20">20 years</SelectItem>
                <SelectItem value="25">25 years</SelectItem>
                <SelectItem value="30">30 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200/50">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">ROI</span>
            </div>
            <div className="text-2xl font-bold text-emerald-900">{formatPercentage(calculation.roi)}</div>
            <div className="text-xs text-emerald-600 mt-1">Annual return on investment</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200/50">
            <div className="flex items-center gap-3 mb-3">
              <PieChart className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Rental Yield</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{formatPercentage(calculation.rentalYield)}</div>
            <div className="text-xs text-blue-600 mt-1">Gross rental yield</div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200/50">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Down Payment</span>
            </div>
            <div className="text-2xl font-bold text-amber-900">{formatCurrency(calculation.downPayment)}</div>
            <div className="text-xs text-amber-600 mt-1">Initial investment required</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200/50">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Break-even</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">{calculation.breakeven.toFixed(1)} years</div>
            <div className="text-xs text-purple-600 mt-1">Time to recover investment</div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-serif font-semibold text-slate-900">Market Insights</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-slate-50/50">
            <div className="text-2xl font-bold text-slate-900">{formatPercentage(marketData.averageYield)}</div>
            <div className="text-sm text-slate-600 mt-1">Average Yield</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-slate-50/50">
            <div className="text-2xl font-bold text-slate-900">{formatPercentage(marketData.priceGrowth)}</div>
            <div className="text-sm text-slate-600 mt-1">Price Growth</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-slate-50/50">
            <div className="text-2xl font-bold text-slate-900">{marketData.demandIndex}</div>
            <div className="text-sm text-slate-600 mt-1">Demand Index</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-slate-50/50">
            <div className="text-2xl font-bold text-slate-900">{marketData.supplyIndex}</div>
            <div className="text-sm text-slate-600 mt-1">Supply Index</div>
          </div>
        </div>
      </div>
    </div>
  );
};

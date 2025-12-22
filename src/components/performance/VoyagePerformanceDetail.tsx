import React from 'react';
import { Save, Anchor, ChevronLeft, ChevronRight, Menu, Plus, Map as MapIcon, AlertTriangle } from 'lucide-react';

export function VoyagePerformanceDetail() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans text-sm">
            {/* Header Toolbar */}
            <div className="bg-white border-b border-slate-200 p-2 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 uppercase tracking-wider text-xs">Vessel</span>
                        <span className="font-bold text-slate-900 text-lg">Baltic Narval</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Voy#:</span>
                        <span className="font-medium text-slate-900">25/009</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Hire:</span>
                        <span className="font-medium text-slate-900">$25,550.00</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Offhire (Days):</span>
                        <span className="font-medium text-slate-900">0</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                        <Save className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-900">
                        <Anchor className="h-6 w-6" />
                    </button>
                    <div className="flex items-center border border-slate-200 rounded overflow-hidden">
                        <button className="p-1 hover:bg-slate-100 border-r border-slate-200"><ChevronLeft className="h-5 w-5" /></button>
                        <button className="p-1 hover:bg-slate-100"><ChevronRight className="h-5 w-5" /></button>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-900">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Results Bar */}
            <div className="grid grid-cols-10 gap-4 p-4 border-b border-slate-200 bg-slate-50/50">
                <div className="col-span-1">
                    <div className="font-bold text-emerald-600 uppercase text-xs mb-1">Results</div>
                    <div className="text-xs text-slate-400">+/-</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Revenue +</div>
                    <div className="font-bold text-slate-900">$1,111,500</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Comm</div>
                    <div className="font-bold text-slate-900">$0</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Port</div>
                    <div className="font-bold text-slate-900">$116,892</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Bunkers</div>
                    <div className="font-bold text-slate-900">$196,310</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Expense</div>
                    <div className="font-bold text-slate-900">$44,152</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Days +</div>
                    <div className="font-bold text-slate-900">25.66</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">TCE</div>
                    <div className="font-bold text-slate-900">$29,389</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Refill TCE</div>
                    <div className="font-bold text-slate-900">$28,539</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">PnL</div>
                    <div className="font-bold text-slate-900">$98,504</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Efficiency</div>
                    <div className="font-bold text-slate-900">76%</div>
                </div>
            </div>

            {/* Fixture Section */}
            <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4 flex-wrap">
                <span className="font-bold text-yellow-600 uppercase text-xs bg-yellow-50 px-2 py-1 rounded">Fixture</span>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">Fixture #</span>
                    <input type="text" className="border border-slate-200 rounded px-2 py-1 text-sm w-24" />
                </div>
                <div className="flex items-center gap-2 bg-yellow-100/50 px-2 py-1 rounded">
                    <input type="text" className="bg-transparent border-none text-right w-20 font-medium focus:ring-0 p-0" defaultValue="19500" />
                    <span className="text-xs font-bold">mt</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">Comm</span>
                    <span className="text-xs font-bold">%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">Colas</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100/50 px-3 py-1 rounded">
                    <span className="text-xs text-slate-400">-- Broker --</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-slate-500 text-xs">L/C:</span>
                    <span className="text-slate-900 font-medium">Dec 17-21, 2025</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-200 px-2 py-1 rounded">
                    <span className="text-xs font-bold">L/T(hrs)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">C/P</span>
                    <span className="text-slate-900 font-medium">08 Dec 2025</span>
                </div>
            </div>

            {/* Legs Table */}
            <div className="border-b border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs text-slate-500">
                                <th className="px-4 py-2 font-bold text-emerald-600 uppercase w-48">Legs</th>
                                <th className="px-2 py-2 text-right">Cost</th>
                                <th className="px-2 py-2 text-right">Days</th>
                                <th className="px-2 py-2 text-right text-emerald-600">Speed</th>
                                <th className="px-2 py-2 text-right text-sky-600">Wx 15%</th>
                                <th className="px-2 py-2 text-right">Dist</th>
                                <th className="px-4 py-2">Arrive</th>
                                <th className="px-4 py-2">Depart</th>
                                <th className="px-2 py-2 text-right">Psg</th>
                                <th className="px-2 py-2 text-right">LSGO</th>
                                <th className="px-2 py-2 text-right">LNG</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Off Malta 1 (TA)</td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-4 py-2"></td>
                                <td className="px-4 py-2 text-slate-400">15 Dec 05:00</td>
                                <td className="px-2 py-2 text-right"></td>
                                <td className="px-2 py-2 text-right font-medium">407</td>
                                <td className="px-2 py-2 text-right font-medium">275</td>
                            </tr>
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Dardanelles N</td>
                                <td className="px-2 py-2 text-right">$5,000.00</td>
                                <td className="px-2 py-2 text-right">1.00</td>
                                <td className="px-2 py-2 text-right">13.70</td>
                                <td className="px-2 py-2 text-right">0.31</td>
                                <td className="px-2 py-2 text-right">676</td>
                                <td className="px-4 py-2 text-slate-500">17 Dec 15:42</td>
                                <td className="px-4 py-2 text-slate-500">18 Dec 15:42</td>
                                <td className="px-2 py-2 text-right">2.36</td>
                                <td className="px-2 py-2 text-right font-medium">370</td>
                                <td className="px-2 py-2 text-right font-medium">272</td>
                            </tr>
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Izmit</td>
                                <td className="px-2 py-2 text-right">$40,491.97</td>
                                <td className="px-2 py-2 text-right">4.00</td>
                                <td className="px-2 py-2 text-right">13.70</td>
                                <td className="px-2 py-2 text-right">0.09</td>
                                <td className="px-2 py-2 text-right">190</td>
                                <td className="px-4 py-2 text-slate-500">19 Dec 07:37</td>
                                <td className="px-4 py-2 text-slate-500">23 Dec 07:37</td>
                                <td className="px-2 py-2 text-right">0.66</td>
                                <td className="px-2 py-2 text-right font-medium">353</td>
                                <td className="px-2 py-2 text-right font-medium">271</td>
                            </tr>
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Dardanelles S</td>
                                <td className="px-2 py-2 text-right">$5,000.00</td>
                                <td className="px-2 py-2 text-right">1.00</td>
                                <td className="px-2 py-2 text-right">13.56</td>
                                <td className="px-2 py-2 text-right">0.09</td>
                                <td className="px-2 py-2 text-right">196</td>
                                <td className="px-4 py-2 text-slate-500">24 Dec 00:14</td>
                                <td className="px-4 py-2 text-slate-500">25 Dec 00:14</td>
                                <td className="px-2 py-2 text-right">0.69</td>
                                <td className="px-2 py-2 text-right font-medium">340</td>
                                <td className="px-2 py-2 text-right font-medium">270</td>
                            </tr>
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Algeciras</td>
                                <td className="px-2 py-2 text-right">$1,400.24</td>
                                <td className="px-2 py-2 text-right">1.00</td>
                                <td className="px-2 py-2 text-right">13.56</td>
                                <td className="px-2 py-2 text-right">0.77</td>
                                <td className="px-2 py-2 text-right">1677</td>
                                <td className="px-4 py-2 text-slate-500">30 Dec 20:28</td>
                                <td className="px-4 py-2 text-slate-500">31 Dec 20:28</td>
                                <td className="px-2 py-2 text-right">5.93</td>
                                <td className="px-2 py-2 text-right font-medium">245</td>
                                <td className="px-2 py-2 text-right font-medium">261</td>
                            </tr>
                            <tr className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="px-4 py-2 font-medium text-slate-900">Antwerp</td>
                                <td className="px-2 py-2 text-right">$65,000.00</td>
                                <td className="px-2 py-2 text-right">4.00</td>
                                <td className="px-2 py-2 text-right">13.56</td>
                                <td className="px-2 py-2 text-right">0.65</td>
                                <td className="px-2 py-2 text-right">1420</td>
                                <td className="px-4 py-2 text-slate-500">05 Jan 20:52</td>
                                <td className="px-4 py-2 text-slate-500">09 Jan 20:52</td>
                                <td className="px-2 py-2 text-right">5.02</td>
                                <td className="px-2 py-2 text-right font-medium">156</td>
                                <td className="px-2 py-2 text-right font-medium">253</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="flex items-center gap-1 text-emerald-600 text-xs font-bold px-4 py-2 hover:bg-emerald-50">
                        <Plus className="h-3 w-3" /> Add
                    </button>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-12 border-b border-slate-200">
                {/* Revenue - 4 cols */}
                <div className="col-span-12 lg:col-span-5 border-r border-slate-200 p-4">
                    <div className="font-bold text-yellow-600 uppercase text-xs mb-3">Revenue</div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-100">
                                <th className="text-left py-1"></th>
                                <th className="text-right py-1">WS</th>
                                <th className="text-right py-1">Qty</th>
                                <th className="text-right py-1">Rate Comm</th>
                                <th className="text-right py-1">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 font-medium text-slate-900">Freight</td>
                                <td className="py-2 text-right"></td>
                                <td className="py-2 text-right font-medium">19500</td>
                                <td className="py-2 text-right flex justify-end items-center gap-2">
                                    $57.00 <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3 w-3" defaultChecked />
                                </td>
                                <td className="py-2 text-right text-slate-400">$1,111,500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Expense - 3 cols */}
                <div className="col-span-12 lg:col-span-3 border-r border-slate-200 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="font-bold text-slate-900 uppercase text-xs">Expense</div>
                        <div className="text-xs text-slate-500">Amount Daily</div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-700">ETS</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">$30,977.03</span>
                                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3 w-3" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-yellow-50 -mx-2 px-2 py-1 rounded">
                            <span className="text-slate-700">Miscellaneous</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">$1,320.00</span>
                                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3 w-3" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-700">Management</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">$462.00</span>
                                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3 w-3" defaultChecked />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bunkers & Emissions - 4 cols */}
                <div className="col-span-12 lg:col-span-4 p-4">
                    <div className="mb-4">
                        <div className="grid grid-cols-4 gap-2 text-xs mb-2">
                            <div className="font-bold text-emerald-600 uppercase col-span-1">Bunkers</div>
                            <div className="text-right text-slate-500">Refill</div>
                            <div className="text-right text-slate-500">Price</div>
                            <div className="text-right text-slate-500">Cons</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm mb-1">
                            <div className="font-medium text-slate-900">LSGO</div>
                            <div className="text-right">$800.00</div>
                            <div className="text-right">$722.00</div>
                            <div className="text-right">250.66</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <div className="font-medium text-slate-900">LNG</div>
                            <div className="text-right">$800.00</div>
                            <div className="text-right">$697.12</div>
                            <div className="text-right">21.99</div>
                        </div>
                    </div>

                    <div>
                        <div className="font-bold text-emerald-600 uppercase text-xs mb-2">Emissions</div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">EEOI</span>
                                <span className="font-medium">0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">AER</span>
                                <span className="font-medium">-</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">EU ETS</span>
                                <span className="font-medium">305</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">$30,977</span>
                            </div>
                            <div className="flex justify-between col-span-2">
                                <span className="text-slate-600">FuelEU</span>
                                <div className="flex gap-4">
                                    <span className="font-medium">502,586</span>
                                    <span className="font-medium">$4,509</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer: Remarks & Map */}
            <div className="grid grid-cols-12 h-64">
                <div className="col-span-12 lg:col-span-8 p-4 border-r border-slate-200">
                    <div className="font-bold text-emerald-600 uppercase text-xs mb-2">Remarks</div>
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-slate-900 text-sm">VOYAGE SUMMARY WHEN FIXED</div>
                            <div className="text-sm text-slate-600">Baltic Narval, $29k, 26 days, @ $57.00/mt, 12/17-21, Izmit - Antwerp</div>
                        </div>
                        <div className="flex justify-between items-start text-sm">
                            <ul className="list-disc list-inside text-slate-700 pl-2">
                                <li>53/57</li>
                            </ul>
                            <div className="text-right space-y-1">
                                <div className="flex gap-4 justify-end">
                                    <span className="font-bold">$29,389</span>
                                    <span className="text-slate-900">Vimonses, Vipoom</span>
                                    <span className="text-slate-500">Dec 8</span>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    <span className="font-bold">$29,441</span>
                                    <span className="text-slate-900">Jambusarwalla, Zarir</span>
                                    <span className="text-slate-500">Oct 16</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4 bg-slate-100 relative">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <MapIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <span className="text-xs">Map Visualization</span>
                        </div>
                    </div>
                    {/* Mock Map Overlay Elements */}
                    <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-sm">
                        <div className="w-4 h-4 border-2 border-slate-400 rounded-sm"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white/80 px-1 text-[10px] text-slate-500">
                        Leaflet | Tiles © Esri
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { AlertCircleIcon, RefreshCwIcon, ShieldAlertIcon, XCircleIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    title: string;
    description: string;
    onRetry?: () => void;
};

export const ErrorState = ({
    title,
    description,
    onRetry
}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-background to-destructive/5 rounded-2xl p-12 shadow-lg border border-destructive/20 relative overflow-hidden">
                {/* Animated error background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-destructive/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                {/* Main error animation */}
                <div className="relative">
                    {/* Error pulse ring */}
                    <div className="absolute inset-0 w-24 h-24 border-4 border-destructive/20 rounded-full animate-ping" />
                    
                    {/* Shaking error icon */}
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-destructive/20 to-orange-500/20 backdrop-blur-sm border-2 border-destructive/30 animate-shake">
                        <div className="relative">
                            <AlertCircleIcon className="size-10 text-destructive animate-pulse" />
                            <XCircleIcon className="absolute -top-1 -right-1 size-5 text-white animate-bounce" />
                        </div>
                    </div>

                    {/* Warning symbols around */}
                    <div className="absolute -top-2 -right-2">
                        <ShieldAlertIcon className="size-6 text-yellow-500 animate-spin-slow" />
                    </div>
                    <div className="absolute -bottom-2 -left-2">
                        <ZapIcon className="size-5 text-orange-500 animate-pulse" />
                    </div>
                </div>

                {/* Content with animations */}
                <div className="flex flex-col gap-y-4 text-center relative z-10 max-w-md">
                    <div className="space-y-3">
                        <h6 className="text-xl font-bold bg-gradient-to-r from-destructive via-orange-500 to-rose-500 bg-clip-text text-transparent animate-gradient">
                            {title}
                        </h6>
                        
                        {/* Error code animation */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-full border border-destructive/20">
                            <div className="flex gap-1">
                                {['E', 'R', 'R', '0', 'R'].map((char, i) => (
                                    <span 
                                        key={i}
                                        className="text-xs font-mono text-destructive animate-bounce"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground font-mono">
                                0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                    
                    {/* Error detail indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        {['Connection Failed', 'API Timeout', 'Validation Error', 'Server Error'].map((error, index) => (
                            <div
                                key={error}
                                className="px-2 py-1 bg-destructive/5 rounded-md border border-destructive/10 text-xs font-mono text-destructive/80 animate-fade-in"
                                style={{ 
                                    animationDelay: `${index * 150}ms`,
                                    opacity: Math.random() > 0.5 ? 1 : 0.7
                                }}
                            >
                                {error}
                            </div>
                        ))}
                    </div>
                    
                    {/* Action buttons */}
                    {onRetry && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                            <Button
                                onClick={onRetry}
                                className="bg-gradient-to-r from-destructive to-orange-500 hover:from-destructive/90 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <RefreshCwIcon className="size-4 mr-2 group-hover:animate-spin" />
                                Retry Connection
                            </Button>
                            <Button
                                variant="outline"
                                className="border-destructive/20 text-destructive hover:bg-destructive/5"
                            >
                                Report Issue
                            </Button>
                        </div>
                    )}
                    
                    {/* Debug info */}
                    <div className="mt-6 pt-4 border-t border-destructive/10">
                        <div className="text-xs text-muted-foreground font-mono space-y-1">
                            <div className="flex justify-between">
                                <span>Timestamp:</span>
                                <span>{new Date().toISOString().split('T')[1].split('.')[0]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Endpoint:</span>
                                <span className="text-destructive/70">/api/v1/...</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-destructive">Failed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated error particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => {
                        const size = Math.random() * 6 + 2;
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full bg-gradient-to-r from-destructive/30 to-orange-500/30 animate-error-float"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    animationDelay: `${i * 200}ms`,
                                    animationDuration: `${Math.random() * 3 + 2}s`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
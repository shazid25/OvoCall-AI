// import { Loader2Icon } from "lucide-react";

// interface Props {
//     title: string;
//     description: string;
// };

// export const LoadingState = ({
//     title,
//     description
// }: Props) => {
//     return (
//         <div className="py-4 px-8 flex flex-1 items-center justify-center">
//             <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
//                 <Loader2Icon className="size-6 animate-spin text-primary" />
//                 <div className="flex flex-col gap-y-2 text-center">
//                     <h6 className="text-lg font-medium">{title}</h6>
//                     <p className="text-sm">{description}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };



import { Loader2Icon, SparklesIcon, CpuIcon, BrainIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const LoadingState = ({
    title,
    description
}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-background to-sidebar/20 rounded-2xl p-12 shadow-lg border border-border/20 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Main loading animation */}
                <div className="relative">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-primary/30 border-r-primary/30 rounded-full animate-spin" />
                    
                    {/* Middle ring */}
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-purple-500/40 border-l-purple-500/40 rounded-full animate-spin-reverse" />
                    
                    {/* Inner core */}
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                        <div className="relative">
                            <BrainIcon className="size-8 text-primary animate-pulse" />
                            <SparklesIcon className="absolute -top-1 -right-1 size-4 text-yellow-400 animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* Content with animations */}
                <div className="flex flex-col gap-y-4 text-center relative z-10">
                    <div className="space-y-2">
                        <h6 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                            {title}
                        </h6>
                        <div className="flex items-center justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse"
                                    style={{
                                        animationDelay: `${i * 200}ms`,
                                        animationDuration: '1s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                        {description}
                    </p>
                    
                    {/* Animated progress indicator */}
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500 animate-progress" />
                    </div>
                    
                    {/* Tech-themed decorative elements */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                        {['AI', 'ML', 'GPT', 'LLM'].map((tech, index) => (
                            <div
                                key={tech}
                                className="px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10 backdrop-blur-sm text-xs font-mono text-primary/80 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                            style={{
                                left: `${20 + i * 10}%`,
                                top: `${10 + (i * 5)}%`,
                                animationDelay: `${i * 200}ms`,
                                animationDuration: '3s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
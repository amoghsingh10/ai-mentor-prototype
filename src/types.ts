export interface UserContext {
    monthlySurplus: number;
    goal: string;
    riskTolerance: string;
    isOnboarded: boolean;
}

export interface Message {
    id: string;
    role: 'user' | 'mentor';
    content: string;
    isChartMsg?: boolean;
    options?: string[]; // for quick replies
}

import { UserContext } from '../types';

export interface Topic {
    keywords: string[];
    content: string | ((context: UserContext) => string);
    isChart?: boolean;
    options?: string[];
}

export const KNOWLEDGE_BASE: Topic[] = [
    // --- 1. CORE CONCEPTS & ONBOARDING ---
    {
        keywords: ['hello', 'hi', 'start', 'hey', 'greetings', 'morning', 'afternoon'],
        content: (context: UserContext) => `Hi there! 👋 I'm your AI Mentor. I see your goal is to save for a **${context.goal}** and you can put aside **$${context.monthlySurplus}** monthly. Excellent start!\n\nI'm here to translate complex finance jargon into plain English. What are you curious about today?`,
        options: ["How do I start investing?", "Show me how my money can grow", "What is an Index Fund?"]
    },
    {
        keywords: ['show me', 'math', 'chart', 'grow', 'numbers', 'calculate', 'visualize', 'calculator', 'projection'],
        isChart: true,
        content: (context: UserContext) => `Let's look at the numbers based on your **$${context.monthlySurplus}/month** surplus. If you kept this under the mattress vs. investing it in a growth engine (like a mutual fund averaging ~8%), here is the magic of **compounding** over 20 years:`,
        options: ["What is Compound Interest?", "Tell me about Mutual Funds"]
    },

    // --- 2. BANKING & ACCOUNTS ---
    {
        keywords: ['savings account', 'bank account', 'checking account'],
        content: "A **Savings/Checking Account** is like a secure parking lot for your money. It's safe, and you can take your money out whenever you want (high liquidity). The downside? The bank hardly pays you any interest, meaning inflation usually eats away at your money's value over time.",
        options: ["What is inflation?", "Where should I keep my money?"]
    },
    {
        keywords: ['fixed deposit', 'fd', 'certificate of deposit', 'cd'],
        content: "A **Fixed Deposit (FD) / CD** is like locking your money in a super-safe time capsule. You promise not to touch it for a set time (like 1 year), and the bank guarantees a fixed return. It's great for safety, but bad for long-term wealthy building because the return is usually very low.",
        options: ["Why a Mutual Fund over FD?", "What is an Emergency Fund?"]
    },
    {
        keywords: ['emergency fund', 'rainy day fund', 'savings'],
        content: "An **Emergency Fund** is your financial shock absorber. It's cash kept in a safe, easily accessible place to cover 3-6 months of essential living expenses. If your car breaks down or you lose your job, you hit the shock absorber instead of going into high-interest debt!",
        options: ["How much should I save?", "What debt should I pay off first?"]
    },
    {
        keywords: ['overdraft', 'overdrawn', 'bounced check'],
        content: "**Overdraft** is when you spend more money than you actually have in your checking account. The bank kindly covers the difference... and then slaps you with a massive fee for the privilege. Always keep a little buffer in checking to avoid these traps!",
        options: ["How do I budget better?"]
    },

    // --- 3. INVESTING BASICS ---
    {
        keywords: ['mutual fund', 'mutual funds'],
        content: "Think of a **Mutual Fund** like a massive potluck dinner. Instead of buying individual expensive ingredients yourself (like buying single stocks), you chip in money with thousands of others to hire a pro chef (the fund manager). That manager buys a huge buffet of investments, giving you access to a little bit of everything at a much lower cost and risk!",
        options: ["What about the risk?", "Show me how it grows", "What is an Index Fund?"]
    },
    {
        keywords: ['index fund', 'nifty', 'sensex', 's&p', 'index funds'],
        content: "An **Index Fund** is a specialized, automated type of mutual fund. Instead of a chef trying to pick winning ingredients, the fund just buys *everything* in the supermarket (like the entire stock market). Because it runs on autopilot, the fees are incredibly low, meaning you keep more of your own money over time!",
        options: ["Show me the math", "How is it different from stocks?"]
    },
    {
        keywords: ['etf', 'etfs', 'exchange traded fund'],
        content: "An **ETF (Exchange Traded Fund)** is extremely similar to a Mutual Fund—it's a basket of many investments. The main difference is you can buy and sell an ETF all day long on the stock market, just like a regular stock, whereas mutual funds are only traded once at the end of the day.",
        options: ["ETF or Mutual Fund?", "How do I buy one?"]
    },
    {
        keywords: ['stock', 'stocks', 'share', 'shares', 'equity', 'equities'],
        content: "Buying a **Stock** means you are buying a tiny slice of a real business. If the business makes money and grows, your slice becomes more valuable! But if the business struggles, your slice loses value. It's higher risk, but has the highest potential for long-term growth.",
        options: ["What about Mutual Funds?", "How risky is it?"]
    },
    {
        keywords: ['bond', 'bonds', 'fixed income'],
        content: "A **Bond** is basically an IOU. When you buy a bond, you are lending your money to a company or a government. In return, they promise to pay you back with a fixed amount of interest. It's less risky than a stock, but usually offers lower returns.",
        options: ["Stocks vs Bonds?", "Are bonds safe?"]
    },
    {
        keywords: ['diversify', 'diversification', 'portfolio', 'asset allocation'],
        content: "**Diversification** is the golden rule of investing: *Don't put all your eggs in one basket.* If you only buy one stock and that company fails, you lose everything. By spreading your money across different stocks, bonds, and real estate, you protect yourself if one area takes a hit.",
        options: ["What is an Index Fund?", "How much should go to stocks?"]
    },
    {
        keywords: ['compound interest', 'compounding', 'compound'],
        content: "**Compound Interest** is the closest thing to magic in finance. Imagine a small snowball rolling down a snowy hill. As it rolls, it gathers more snow, getting bigger and faster. In investing, you earn interest on your money, and then you start earning interest *on your interest*! The earlier you start, the bigger the snowball gets.",
        options: ["Show me the math!"]
    },
    {
        keywords: ['dividend', 'dividends', 'yield'],
        content: "A **Dividend** is a company saying 'Thank you for owning our stock!' by paying you a small portion of their profits in cash, usually every few months. You can use that cash to buy *more* stock, which supercharges your compounding snowball!",
        options: ["What is Compound Interest?", "Do all stocks pay dividends?"]
    },

    // --- 4. ADVANCED INVESTING & TRADING ---
    {
        keywords: ['crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'btc'],
        content: "**Cryptocurrency** is like the Wild West of finance right now. It can have massive gains, but also massive, sudden drops. As a first-time investor, it's generally wiser to build a solid foundation with proven growth engines (like Index Funds) before putting money into highly volatile assets like crypto.",
        options: ["What is an Index Fund?", "Is crypto safe?"]
    },
    {
        keywords: ['day trading', 'day trade', 'trading', 'forex', 'options'],
        content: "**Day Trading** (constantly buying and selling stocks to make quick profits) is more like gambling in a casino than investing. Studies show over 90% of day traders lose money. True wealth is built by buying solid assets and holding them patiently for years.",
        options: ["How do I invest safely?", "What is an Index Fund?"]
    },
    {
        keywords: ['short selling', 'shorting', 'short squeeze'],
        content: "**Short Selling** is betting that a stock will go *down*. You borrow a stock, sell it, and hope to buy it back cheaper later. If the stock goes up instead, your losses can be practically unlimited. It's a very dangerous game for beginners. Keep it simple and buy quality assets!",
        options: ["What's a better way to invest?"]
    },
    {
        keywords: ['ipo', 'initial public offering'],
        content: "An **IPO (Initial Public Offering)** is a stock's debut party. It's the first time a private company sells shares to the public. They get a lot of hype, but IPOs are often overpriced and very volatile. Wait for the dust to settle before investing.",
        options: ["What is market cap?", "Index funds vs Stocks"]
    },
    {
        keywords: ['market cap', 'large cap', 'small cap', 'capitalization'],
        content: "**Market Capitalization (Market Cap)** is just the total price tag of a whole company. (Number of shares x Price per share). 'Large-cap' companies are massive, stable giants (like Apple). 'Small-cap' companies are smaller, riskier, but have more room to grow aggressively.",
        options: ["What is an Index Fund?"]
    },
    {
        keywords: ['margin', 'margin call', 'borrowing to invest'],
        content: "Buying on **Margin** means borrowing money from a broker to buy stocks. If the stock goes up, you make more money. If it goes down, you lose the borrowed money *and* your own money, and the broker can force you to sell everything immediately (a Margin Call). Avoid margin completely when starting out!",
        options: ["What is Debt?", "Tell me about safe investing"]
    },
    {
        keywords: ['dollar cost averaging', 'dca', 'sip', 'systematic investment plan'],
        content: "**Dollar Cost Averaging (DCA)** or **SIP** is the ultimate stress-free strategy. It means investing a fixed amount of money every single month, no matter what the stock market is doing. When the market is high, you buy fewer shares. When the market is low, you buy the shares on sale! It removes the emotion from investing.",
        options: ["Show me how it grows", "What should I invest in?"]
    },
    {
        keywords: ['bull market', 'bear market'],
        content: "A **Bull Market** is when the stock market is charging upwards (like a bull thrusting its horns up). A **Bear Market** is when the market is falling (like a bear swiping its paws down). Bear markets are scary, but historically, every single bear market has eventually been followed by a bull market that goes even higher.",
        options: ["What is an Index Fund?", "Should I sell when it falls?"]
    },

    // --- 5. ECONOMICS & MACRO ---
    {
        keywords: ['inflation', 'cpi'],
        content: "**Inflation** is like a silent thief. If a cup of coffee costs $3 today, inflation means it might cost $3.50 in a few years. If your money is just sitting in cash, it loses its 'buying power' over time. That's why we invest—to grow our money faster than the thief can steal its value!",
        options: ["How do I beat inflation?", "Show me how it grows"]
    },
    {
        keywords: ['deflation'],
        content: "**Deflation** is the opposite of inflation—prices actually go down. Sounds great, right? But if prices keep falling, people stop buying things (waiting for it to get cheaper), companies stop making money, and people lose jobs. A tiny bit of inflation is actually healthy for an economy.",
        options: ["What is inflation?"]
    },
    {
        keywords: ['recession', 'depression', 'crash'],
        content: "A **Recession** is a period where the whole economy slows down, businesses struggle, and unemployment rises. They usually happen every 7-10 years. While scary, they are a normal part of the economic cycle. The best protection to weather a recession is having a solid Emergency Fund and avoiding bad debt.",
        options: ["What is an Emergency fund?", "What is a Bear Market?"]
    },
    {
        keywords: ['interest rate', 'fed', 'federal reserve', 'central bank'],
        content: "**Interest Rates** set by the Central Bank act like the gas pedal or brakes for the economy. Lowering rates makes borrowing cheaper, so people buy more houses and cars (gas pedal). Raising rates makes borrowing expensive, slowing down spending to cool off inflation (brakes).",
        options: ["How does this affect my loans?"]
    },

    // --- 6. DEBT & CREDIT ---
    {
        keywords: ['credit score', 'fico', 'cibil', 'credit rating'],
        content: "Your **Credit Score** is basically your adult 'trustworthiness' grade ranging from bad (e.g., 300) to excellent (850). Lenders look at this number to decide if they should loan you money for a car or house, and at what interest rate. Pay your bills on time, keep balances low, and your score will go up!",
        options: ["How to build credit?", "What is a Credit Card?"]
    },
    {
        keywords: ['credit card', 'credit cards', 'visa', 'mastercard'],
        content: "A **Credit Card** is a sharp kitchen knife—it's incredibly useful if used correctly, but very dangerous if you slip up. If you pay off your *entire* balance every single month, it's free money (rewards) and builds your credit score. If you carry a balance, the colossal interest rates will destroy your wealth.",
        options: ["What is Debt?", "What is a Credit Score?"]
    },
    {
        keywords: ['debt', 'loans', 'borrowing'],
        content: "High-interest **Debt** (like credit cards) is compound interest working *against* you. It's like trying to fill a bucket with water while there's a huge hole in the bottom. Before investing heavily, your number one goal should usually be plugging that hole by paying off high-interest debt!",
        options: ["What about an Emergency Fund?", "Show me how my money can grow"]
    },
    {
        keywords: ['mortgage', 'home loan', 'home buying'],
        content: "A **Mortgage** is a massive loan specifically used to buy real estate, usually paid back over 15 to 30 years. Because the house acts as collateral (the bank can take it if you don't pay), mortgage interest rates are usually much lower than credit cards or personal loans.",
        options: ["What is a Down Payment?", "Renting vs Buying"]
    },
    {
        keywords: ['down payment'],
        content: "A **Down Payment** is the chunk of cash you pay upfront when buying a high-ticket item, usually a house. A standard goal is 20% of the house price to avoid extra insurance fees, but many programs allow 3% or 5%.",
        options: ["What is a Mortgage?"]
    },
    {
        keywords: ['apr', 'annual percentage rate'],
        content: "**APR (Annual Percentage Rate)** is the truest cost of borrowing money over a year. It includes the interest rate *plus* any sneaky fees the lender might charge. Always compare APRs when looking at loans or credit cards, not just the base interest rate.",
        options: ["What is Debt?"]
    },
    {
        keywords: ['buy now pay later', 'bnpl', 'afterpay', 'klarna'],
        content: "**Buy Now, Pay Later (BNPL)** services split purchases into smaller chunks. While they seem convenient, they often trick our brains into buying things we can't afford, leading to missed payments and damaged credit. If you don't have the cash to buy it today, you generally shouldn't buy it.",
        options: ["How to budget?", "What is an Emergency Fund?"]
    },

    // --- 7. RETIREMENT & TAXES ---
    {
        keywords: ['401k', '403b', 'employer match', 'company match', 'provident fund', 'epf'],
        content: "A **401(k) / Provident Fund** is a special retirement investment bucket tied to your job. The best part? Many employers offer a 'Match'—meaning if you put in $1, they also put in $1, up to a certain limit. Always contribute enough to get the full match. It is literal free money!",
        options: ["What is an IRA?", "Show me how returning money grows"]
    },
    {
        keywords: ['ira', 'roth', 'traditional ira', 'roth ira', 'ppf'],
        content: "An **IRA (Individual Retirement Account)** or **PPF** is a personal retirement bucket that gives you massive tax benefits for keeping your money locked up until you are older. A 'Roth' version means you pay taxes now, but all the growth over the next 30 years is completely tax-free!",
        options: ["401k vs IRA?", "What should I invest my IRA in?"]
    },
    {
        keywords: ['tax', 'taxes', 'income tax', 'capital gains'],
        content: "When you invest, the government usually wants a cut of the profits you make. This is called **Capital Gains Tax**. But here's the trick: if you hold an investment for more than a year before selling it, the government rewards you by taxing you at a much lower rate! This is why patience pays.",
        options: ["What are tax brackets?", "Tell me about Roth IRAs"]
    },
    {
        keywords: ['tax bracket', 'marginal tax', 'tax rate'],
        content: "A **Tax Bracket** is like climbing a staircase. You don't pay the highest tax rate on *all* your money, only on the money that steps up into the highest rung. If you get a raise that pushes you into a higher bracket, you only pay the higher tax on the new extra money. A raise is *always* good!",
        options: ["What is Capital Gains?"]
    },
    {
        keywords: ['pension', 'social security'],
        content: "A **Pension / Social Security** is a guaranteed paycheck you receive in retirement until you die, usually funded by your employer or the government. They are becoming rare, so you must rely more heavily on your own investments (like 401ks/IRAs) to fund your golden years.",
        options: ["What is a 401k?"]
    },

    // --- 8. PERSONAL FINANCE STRATEGY ---
    {
        keywords: ['budget', 'budgeting', '50/30/20', 'expense tracking'],
        content: "A **Budget** isn't a handcuffs; it's a map. The simplest model is the **50/30/20 Rule**: 50% of your income for Needs (rent, groceries), 30% for Wants (restaurants, hobbies), and 20% for Savings and Investing. Automate your investments so you never 'forget' to save!",
        options: ["How do I start investing?", "What is an Emergency Fund?"]
    },
    {
        keywords: ['net worth', 'networth', 'assets', 'liabilities'],
        content: "Your **Net Worth** is your financial scorecard. It's simply everything you own (Assets like cash, investments, house value) minus everything you owe (Liabilities like loans, credit card debt). A healthy goal is to increase your net worth steadily every single year.",
        options: ["What is Debt?", "Show me how to grow wealth"]
    },
    {
        keywords: ['fire', 'financial independence', 'retire early'],
        content: "**FIRE (Financial Independence, Retire Early)** is a movement of people violently saving 40-70% of their income so they can retire in their 30s or 40s instead of 65. Even if you don't aim for 'Retire Early', striving for 'Financial Independence' gives you immense freedom in life.",
        options: ["Show me the math of compounding!"]
    },
    {
        keywords: ['sinking fund', 'sinking funds'],
        content: "A **Sinking Fund** is a mini savings bucket for a specific, known future expense. For example, setting aside $100 every month because you know car insurance is due in six months. It stops predictable expenses from feeling like emergencies.",
        options: ["What is an Emergency fund?", "How to budget?"]
    },
    {
        keywords: ['fiduciary', 'financial advisor', 'planner'],
        content: "A **Fiduciary** is a specific type of financial advisor who is legally required to act in your absolute best interest. Other types of 'advisors' might recommend bad investments just so they can earn a fat commission. If you hire help, always ask: 'Are you a sworn fiduciary?'",
        options: ["How do I start on my own?"]
    },

    // --- 9. REAL ESTATE ---
    {
        keywords: ['real estate', 'houseing', 'property', 'reit', 'reits'],
        content: "**Real Estate** can be a great investment, but buying a physical house is expensive and lots of work (leaky roofs, tenants). If you want the perks without the headaches, you can buy a **REIT (Real Estate Investment Trust)**. It's a stock that acts just like a mutual fund for properties—you own a tiny slice of many buildings!",
        options: ["What is an ETF?", "Renting vs Buying"]
    },
    {
        keywords: ['renting vs buying', 'rent vs buy', 'buy a house'],
        content: "Renting is not 'throwing money away'—you are paying for shelter, flexibility, and zero maintenance costs. Buying a house locks in your costs and builds equity over time, but comes with property taxes, repairs, and massive loan interest. Both are completely valid depending on your life stage!",
        options: ["What is a Mortgage?", "What is Equity?"]
    },
    {
        keywords: ['equity', 'home equity'],
        content: "When talking about houses, **Equity** is the portion of the house you actually *own*. If your house is worth $300k and your mortgage is $200k, your equity is $100k. Every time you make a mortgage payment, your equity grows a tiny bit.",
        options: ["What is Net Worth?"]
    },

    // --- 10. INSURANCE ---
    {
        keywords: ['insurance', 'premium', 'deductible', 'copay'],
        content: "**Insurance** is paying a small amount of money now (a Premium) to protect yourself from catastrophic financial ruin later. Never skimp on Health, Auto, or Home/Renter's insurance. If you have a family relying on your income, you also strictly need Term Life Insurance.",
        options: ["What is term life insurance?", "What is an Emergency Fund?"]
    },
    {
        keywords: ['life insurance', 'term life', 'whole life'],
        content: "Always buy **Term Life Insurance**. It's cheap and only covers you during your working years when your family relies on your income. Avoid 'Whole Life Insurance'—it tries to mix investing with insurance, resulting in crazy high fees and terrible returns. Keep insurance and investments separate!",
        options: ["What is investing?"]
    },

    // --- 11. GENERAL FAIL-SAFES AND RISK ---
    {
        keywords: ['risk', 'rollercoaster', 'safe', 'volatile', 'fluctuate', 'losing money', 'scared'],
        content: "Great question! Growth engines like stocks go up and down like a rollercoaster in the short term, which is completely normal. But over 10+ years, they tend to climb much higher than cash. FDs are like a merry-go-round—smooth, safe, but they don't take you very high.\n\n> ⚠️ *Remember: I'm here to educate, not to act as a legal financial advisor. Always make decisions that fit your personal comfort zone!*",
        options: ["Show me how it grows", "What is Diversification?"]
    },
    {
        keywords: ['scam', 'fraud', 'ponzi', 'too good to be true', 'guaranteed return'],
        content: "In finance, Risk and Return are directly connected. If anyone promises you 'High returns with zero risk' or 'guaranteed easy money', it is 100% a **Scam**. Legitimate investing takes patience and time. If it sounds too good to be true, run away immediately.",
        options: ["What is safer investing?", "What is an Index Fund?"]
    }
];

// Helper array to quickly check length
export const KNOWLEDGE_BASE_SIZE = KNOWLEDGE_BASE.length;

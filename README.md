# Practical Engineering Challenge

A hands-on interview exercise for Senior Software Engineers. This repository contains a simple pricing API built with Node.js, TypeScript, Express, and AWS CDK.

## Prerequisites

- Node.js v22 or higher
- npm (comes with Node.js)
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd practical-engineering-challenge
   ```

2. **Create a new branch**
   ```bash
   git checkout -b interview/<your-name>
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   ```

6. **Start the application**
   ```bash
   npm start
   ```
   
   The server will start on `http://localhost:3000`

## Interview Tasks (20 minutes)

Complete the following tasks in order. Feel free to ask questions if anything is unclear.

### Task 1: Fix the Pricing Bug (7-8 minutes)

**Scenario:** The pricing discount calculation has a bug that allows invalid discount percentages.

1. Run the application locally: `npm start`
2. Test the pricing endpoint:
   ```bash
   curl "http://localhost:3000/api/price/prod-001?discount=150"
   ```
3. **Problem:** The endpoint returns a negative price when the discount is greater than 100%
4. **Your Task:** 
   - Fix the `calculateDiscount` function in `src/utils/pricing.ts` to validate discount percentages
   - Discount should be clamped between 0 and 100
   - Rebuild and test your fix

**Acceptance Criteria:**
- Discounts > 100 should be treated as 100
- Discounts < 0 should be treated as 0
- Valid discounts (0-100) should work correctly
- The API should return the correct price for all cases

### Task 2: Update CDK Configuration (5-6 minutes)

**Scenario:** The Lambda function needs to be configured for production readiness.

**Your Task:**
- Update `cdk/stacks/pricing-api-stack.ts` to make the following changes:
  1. Change the Lambda timeout from 30 seconds to 10 seconds (more appropriate for this simple API)
  2. Make the environment configurable by reading from `process.env.ENVIRONMENT` with a fallback to 'dev'
  3. Add a stack tag for "Project" with value "PricingAPI"

**Acceptance Criteria:**
- Lambda timeout is reduced to 10 seconds
- Environment is read from environment variable
- Stack includes the Project tag
- CDK synth should work: `npm run cdk:synth`

### Task 3: Add Missing Test Cases (5-6 minutes)

**Scenario:** The unit tests are incomplete and don't cover edge cases.

**Your Task:**
- Update `src/utils/pricing.test.ts` to add test cases for:
  1. Discount > 100 (should be clamped to 100)
  2. Negative discount (should be clamped to 0)
  3. 100% discount (should result in $0)

**Acceptance Criteria:**
- All new tests should pass
- Tests should cover the edge cases mentioned
- Run tests with: `npm test`

## API Endpoints

### Health Check
```bash
GET http://localhost:3000/health
```

### Get Product Price
```bash
GET http://localhost:3000/api/price/:productId?discount=<percentage>
```

**Available Products:**
- `prod-001`: Base price $100
- `prod-002`: Base price $250
- `prod-003`: Base price $500

**Example:**
```bash
curl "http://localhost:3000/api/price/prod-001?discount=10"
```

## Project Structure

```
practical-engineering-challenge/
├── src/
│   ├── app.ts                    # Express application
│   └── utils/
│       ├── pricing.ts            # Pricing logic (contains bug)
│       └── pricing.test.ts       # Unit tests (incomplete)
├── cdk/
│   ├── app.ts                    # CDK app entry point
│   └── stacks/
│       └── pricing-api-stack.ts  # CDK stack definition
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the application
- `npm run dev` - Start with ts-node (development)
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run cdk:synth` - Synthesize CDK stack
- `npm run cdk:deploy` - Deploy to AWS (requires AWS credentials)

## Tips

- Don't overthink the solutions - they should be straightforward
- Make sure to test your changes before considering them complete
- You can run tests in watch mode with `npm run test:watch` for faster feedback
- If you get stuck, ask for help!

## Submission

When you're done:
1. Commit your changes: `git add . && git commit -m "Complete interview tasks"`
2. Push your branch: `git push origin interview/<your-name>`
3. Let the interviewer know you're finished

Good luck! 🚀

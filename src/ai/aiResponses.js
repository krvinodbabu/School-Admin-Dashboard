/**
 * AI Responses Engine — Configuration-driven prompt templates and mock AI responses.
 * Designed for future integration with OpenAI, Gemini, or custom LLM services.
 */

export const AI_ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
  PRINCIPAL: 'principal',
  FINANCE: 'finance',
  TRANSPORT: 'transport',
  STUDENT: 'student',
  HR: 'hr'
};

export const PROMPT_TEMPLATES = [
  { id: 'lesson-plan', role: AI_ROLES.TEACHER, prompt: 'Generate lesson plan for {subject} Class {grade}', icon: '📝' },
  { id: 'homework', role: AI_ROLES.TEACHER, prompt: 'Create homework for {subject} on {topic}', icon: '📚' },
  { id: 'mcq', role: AI_ROLES.TEACHER, prompt: 'Generate 10 MCQs for {subject} Chapter {chapter}', icon: '❓' },
  { id: 'bloom', role: AI_ROLES.TEACHER, prompt: 'Map learning objectives to Bloom\'s taxonomy', icon: '🎯' },
  { id: 'remediation', role: AI_ROLES.TEACHER, prompt: 'Suggest remediation activities for weak students', icon: '💡' },
  { id: 'enrichment', role: AI_ROLES.TEACHER, prompt: 'Suggest enrichment activities for advanced learners', icon: '🌟' },
  { id: 'child-progress', role: AI_ROLES.PARENT, prompt: 'Summarize my child\'s progress this term', icon: '📊' },
  { id: 'child-attendance', role: AI_ROLES.PARENT, prompt: 'Show my child\'s attendance trends', icon: '📅' },
  { id: 'risk-students', role: AI_ROLES.PRINCIPAL, prompt: 'Show students at academic risk', icon: '⚠️' },
  { id: 'fee-delays', role: AI_ROLES.FINANCE, prompt: 'Predict fee collection delays this quarter', icon: '💰' },
  { id: 'route-optimize', role: AI_ROLES.TRANSPORT, prompt: 'Show route optimization suggestions', icon: '🚌' },
  { id: 'staff-attrition', role: AI_ROLES.HR, prompt: 'Predict staff attrition risk', icon: '👥' },
];

const SIMULATED_DELAY_MS = 1200;

const MOCK_RESPONSES = {
  'lesson-plan': `## 📝 Lesson Plan: Mathematics — Class 8

**Topic:** Quadratic Equations
**Duration:** 45 minutes
**Learning Objectives:**
1. Students will understand the standard form of quadratic equations
2. Students will solve quadratic equations using factoring method
3. Students will apply quadratic equations to real-world problems

**Materials:** Whiteboard, graphing calculator, worksheet handouts

**Warm-Up (5 min):**
- Review linear equations as a bridge concept
- Quick mental math challenge

**Direct Instruction (15 min):**
- Introduce ax² + bx + c = 0 form
- Demonstrate factoring with 3 examples
- Show graphical representation

**Guided Practice (10 min):**
- Students work in pairs on 5 problems
- Teacher circulates for support

**Independent Practice (10 min):**
- Individual worksheet with graduated difficulty

**Closure (5 min):**
- Exit ticket: Solve one quadratic equation
- Preview tomorrow's lesson on the quadratic formula

> 🤖 AI Confidence: **94%** · Based on CBSE Class 8 curriculum standards`,

  'homework': `## 📚 Homework Assignment

**Subject:** Mathematics | **Topic:** Algebraic Expressions
**Due Date:** Next Wednesday | **Estimated Time:** 30 minutes

### Questions:
1. Simplify: 3(2x + 4) - 2(x - 1)
2. Expand and simplify: (x + 3)(x - 5)
3. Factorize: x² + 7x + 12
4. **Word Problem:** A rectangular garden has length (x + 4)m and width (x - 2)m. Express the area as a polynomial.
5. **Challenge:** Find two consecutive integers whose product is 72.

### Marking Scheme:
- Q1-Q3: 2 marks each
- Q4: 3 marks
- Q5: 4 marks (bonus)

> 🤖 AI Confidence: **91%** · Aligned with Chapter 4 learning objectives`,

  'mcq': `## ❓ MCQ Assessment — 10 Questions

**1.** What is the value of x in 2x + 6 = 14?
- A) 2  B) 4 ✅  C) 6  D) 8

**2.** Which is a quadratic equation?
- A) 2x + 3 = 0  B) x² + 2x + 1 = 0 ✅  C) x³ = 8  D) √x = 4

**3.** The product of two consecutive even numbers is 48. What are they?
- A) 4 and 8  B) 6 and 8 ✅  C) 8 and 10  D) 2 and 4

**4.** Simplify: (3x²)(2x³)
- A) 5x⁵  B) 6x⁵ ✅  C) 6x⁶  D) 5x⁶

**5.** What is the degree of 4x³ + 2x² - x + 7?
- A) 1  B) 2  C) 3 ✅  D) 4

**6-10.** *[Additional questions generated with similar difficulty]*

### Answer Key:
1-B, 2-B, 3-B, 4-B, 5-C, 6-A, 7-C, 8-D, 9-B, 10-A

> 🤖 AI Confidence: **89%** · Bloom's Level: Remember (40%), Apply (40%), Analyze (20%)`,

  'bloom': `## 🎯 Bloom's Taxonomy Mapping

| Level | Objective | Activities |
|-------|-----------|-----------|
| **Remember** | Recall the quadratic formula | Flashcards, formula drill |
| **Understand** | Explain why the discriminant determines root types | Concept mapping, peer teaching |
| **Apply** | Solve 10 quadratic equations using factoring | Worksheet practice, online quiz |
| **Analyze** | Compare factoring vs. formula method efficiency | Group discussion, method comparison chart |
| **Evaluate** | Judge which solution method is optimal for a given problem | Case study analysis, debate |
| **Create** | Design a real-world problem solvable by quadratic equations | Project-based learning, presentation |

### Distribution:
- Lower Order (Remember + Understand): 30%
- Middle Order (Apply + Analyze): 45%
- Higher Order (Evaluate + Create): 25%

> 🤖 AI Confidence: **96%** · Aligned with NEP 2020 competency framework`,

  'child-progress': `## 📊 Progress Summary — Aarav Sharma (Class 8-A)

### Overall Performance: **B+ (78.4%)**

| Subject | Score | Trend | Status |
|---------|-------|-------|--------|
| Mathematics | 85% | ↗️ Improving | Strong |
| Science | 82% | ↗️ Improving | Strong |
| English | 68% | ↘️ Declining | Needs Support |
| Social Studies | 74% | → Stable | Average |
| Hindi | 79% | ↗️ Improving | Good |

### Key Insights:
✅ **Strengths:** Mathematics and Science — consistently above class average
⚠️ **Area of Concern:** English writing skills have declined over the last 2 assessments
📈 **Improvement:** Hindi scores improved by 12% this term

### AI Recommendations:
1. Consider additional English writing practice (20 min/day)
2. Encourage reading English storybooks to build vocabulary
3. Mathematics talent could be channeled into Olympiad preparation

> 🤖 AI Confidence: **92%** · Based on 6 assessment data points this term`,

  'risk-students': `## ⚠️ Students at Academic Risk

### High Risk (Immediate Attention Required)
| Student | Class | Risk Score | Primary Concern |
|---------|-------|-----------|----------------|
| Rahul Verma | 9-B | 🔴 87% | Attendance < 60%, failing 3 subjects |
| Priya Nair | 8-A | 🔴 82% | Sudden 25% drop in all subjects |
| Amit Singh | 10-C | 🔴 79% | Behavioral issues + declining grades |

### Medium Risk (Monitor Closely)
| Student | Class | Risk Score | Primary Concern |
|---------|-------|-----------|----------------|
| Sneha Patel | 7-A | 🟡 65% | Irregular attendance pattern |
| Karan Mehta | 9-A | 🟡 58% | Below average in 2 core subjects |

### AI Recommendations:
1. Schedule parent-teacher meeting for high-risk students within 1 week
2. Assign peer tutoring for Rahul Verma in Mathematics
3. Counselor intervention recommended for Priya Nair (sudden decline pattern)

> 🤖 AI Confidence: **88%** · Predictive model based on attendance, grades, and behavioral data`,

  'fee-delays': `## 💰 Fee Collection Delay Predictions — Q4

### Predicted Default Rate: **12.4%** (vs 8.2% last quarter)

| Category | Amount at Risk | Probability | Students |
|----------|---------------|-------------|----------|
| Tuition Fees | ₹8,40,000 | High (78%) | 14 families |
| Transport Fees | ₹2,10,000 | Medium (55%) | 22 families |
| Activity Fees | ₹95,000 | Low (30%) | 8 families |

### Contributing Factors:
- 📅 Festival season historically shows 15% higher delays
- 💼 3 families reported job transitions
- 📊 Payment pattern analysis shows late-cycle behavior for 18 accounts

### AI Recommendations:
1. Send early reminders to flagged accounts by Nov 1
2. Offer installment plans to high-risk families
3. Expected recovery with intervention: **91%**

> 🤖 AI Confidence: **85%** · Based on 3-year historical payment patterns`,

  'route-optimize': `## 🚌 Route Optimization Suggestions

### Current Efficiency: **72%** → Optimized: **89%**

| Route | Current Time | Optimized | Savings |
|-------|-------------|-----------|---------|
| Route A (North) | 48 min | 35 min | 13 min |
| Route B (East) | 52 min | 41 min | 11 min |
| Route C (South) | 45 min | 38 min | 7 min |

### Recommendations:
1. Merge stops S4 and S5 on Route A (200m apart)
2. Reverse Route B sequence to avoid school-zone traffic
3. Add 1 bus to Route C to reduce overcrowding (currently at 110% capacity)

> 🤖 AI Confidence: **87%** · Based on GPS data from last 30 days`,

  'remediation': `## 💡 Remediation Activities for Struggling Students

### For Students Scoring Below 40%:

**1. Guided Scaffolding Worksheets**
- Break complex problems into 3-step guided solutions
- Use visual aids and number lines

**2. Peer Tutoring Pairs**
- Pair with top-quartile students for 20-min sessions
- Focus on concept clarification, not answers

**3. Digital Remediation**
- Khan Academy modules mapped to weak topics
- 15 min daily adaptive practice

**4. One-on-One Teacher Sessions**
- Schedule 2 sessions/week during activity period
- Focus on foundational gaps

> 🤖 AI Confidence: **90%** · Evidence-based strategies from educational research`,

  'enrichment': `## 🌟 Enrichment Activities for Advanced Learners

**1. Math Olympiad Preparation**
- Weekly problem-solving sessions with competition-level problems
- Register for regional math olympiad

**2. Research Mini-Projects**
- "Design a survey and analyze data using statistics"
- Present findings to class

**3. Cross-Curricular Challenges**
- Apply math to science experiments (measurement, graphing)
- Code a simple calculator using Python

**4. Mentorship Program**
- Connect with senior students or external mentors
- Independent study on advanced topics

> 🤖 AI Confidence: **93%** · Aligned with gifted education best practices`,

  'staff-attrition': `## 👥 Staff Attrition Risk Analysis

### Overall Risk Level: **Medium (23% predicted turnover)**

| Department | Risk Level | Key Factors |
|-----------|-----------|-------------|
| Mathematics | 🔴 High | 2 teachers with 5+ years, no promotion |
| English | 🟡 Medium | Workload increase, 1 on probation |
| Science | 🟢 Low | Recently hired, good satisfaction scores |
| Admin | 🟡 Medium | Below-market compensation identified |

### AI Recommendations:
1. Conduct retention interviews with Math department this month
2. Review compensation benchmarks for Admin staff
3. Implement recognition program — estimated 15% retention improvement

> 🤖 AI Confidence: **82%** · Based on tenure, satisfaction surveys, and industry benchmarks`,

  'child-attendance': `## 📅 Attendance Trends — Aarav Sharma

### This Term: **88.5%** (Target: 90%)

| Month | Present | Absent | Rate |
|-------|---------|--------|------|
| July | 22/23 | 1 | 96% |
| August | 19/22 | 3 | 86% |
| September | 17/21 | 4 | 81% |
| October | 20/22 | 2 | 91% |

### Patterns Detected:
- 📊 Mondays show 40% higher absence rate
- 🤒 September dip correlates with flu season
- ✅ No unexplained absences

> 🤖 AI Confidence: **95%** · Direct attendance data analysis`,
};

// Fallback response for unmatched prompts
const GENERIC_RESPONSE = `## 🤖 EduOS Copilot Response

I've analyzed your request. Here's what I found:

Based on the current data available in the system, I can provide the following insights:

1. **Data Analysis:** Processing relevant records from the active campus
2. **Pattern Detection:** Identifying trends from historical data
3. **Recommendations:** Generating actionable suggestions

*This is a preview response. Connect to an AI service (OpenAI, Gemini, etc.) for production-grade analysis.*

> 🤖 AI Confidence: **75%** · General analysis mode`;

/**
 * Simulate an AI response with realistic delay.
 * In production, this would call an actual AI API.
 */
export function getAIResponse(promptId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RESPONSES[promptId] || GENERIC_RESPONSE);
    }, SIMULATED_DELAY_MS);
  });
}

/**
 * Simulate a free-form chat response.
 */
export function getChatResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  
  // Match against known patterns
  if (lower.includes('lesson plan')) return getAIResponse('lesson-plan');
  if (lower.includes('homework') || lower.includes('assignment')) return getAIResponse('homework');
  if (lower.includes('mcq') || lower.includes('question')) return getAIResponse('mcq');
  if (lower.includes('bloom')) return getAIResponse('bloom');
  if (lower.includes('progress') || lower.includes('child')) return getAIResponse('child-progress');
  if (lower.includes('risk') || lower.includes('at risk')) return getAIResponse('risk-students');
  if (lower.includes('fee') || lower.includes('collection')) return getAIResponse('fee-delays');
  if (lower.includes('route') || lower.includes('transport')) return getAIResponse('route-optimize');
  if (lower.includes('remediation') || lower.includes('weak')) return getAIResponse('remediation');
  if (lower.includes('enrichment') || lower.includes('advanced')) return getAIResponse('enrichment');
  if (lower.includes('attrition') || lower.includes('staff')) return getAIResponse('staff-attrition');
  if (lower.includes('attendance')) return getAIResponse('child-attendance');
  
  // Generic fallback
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`## 🤖 EduOS Copilot

I understand your query: *"${userMessage}"*

Here's my analysis based on current platform data:

- ✅ Query processed successfully
- 📊 Relevant data sources identified
- 💡 Generating contextual recommendations...

**Summary:** Based on the current academic term data, the patterns suggest stable performance across most metrics. I recommend reviewing the detailed analytics dashboard for deeper insights.

### Next Steps:
1. Check the relevant module dashboard for detailed data
2. Use specific prompts for more targeted analysis
3. Export reports for stakeholder review

> 🤖 AI Confidence: **78%** · Connect an AI backend for enhanced responses`);
    }, SIMULATED_DELAY_MS);
  });
}

# BIOPATH AI — TEAM PROJECT BOARD
**Project period:** 22–27 November 2026  
**Monday's objective:** Finalise our case studies and produce the research needed to begin implementation.

## 1. PROJECT DIRECTION

BIOPATH AI is a decision-support platform that evaluates how agricultural and food-processing by-products could be converted into useful protein products.

We aim to combine:
- Feedstock composition and nutritional information.
- Microbiological conversion pathways.
- Food and feed nutritional requirements.
- Safety considerations.
- Economic and logistical feasibility.
- Eventually, machine learning predictions where sufficient experimental data is available.

For the hackathon, we will focus on a small number of well-researched case studies rather than attempting to cover every possible agricultural by-product.

---

# 2. TEAM ROLES AND ASSIGNMENTS

## WAMBUA / CALVIN — PRODUCT LEAD & FRONTEND DEVELOPER

**Primary responsibility:** Product direction, coordination and frontend development.

### Tasks
- Define the core user journey and what the application should demonstrate.
- Build the React frontend.
- Design the feedstock input interface.
- Design the nutritional information and pathway comparison interfaces.
- Create the results/dashboard interface.
- Coordinate frontend-backend integration.
- Ensure the frontend reflects the actual scientific capabilities of the project.

### Monday deliverables
1. A basic frontend structure and proposed user flow.
2. A list of the information users should enter.
3. A proposed layout for displaying pathway comparisons.
4. Agreement with Jonah on the initial API requirements.

**Priority:** High

## JONAH — BACKEND & DATABASE DEVELOPER

**Primary responsibility:** Backend architecture, database design and API development using NestJS and PostgreSQL.

### Tasks
- Design the initial database structure.
- Identify the entities and relationships required by the project.
- Build the NestJS backend structure.
- Establish API contracts with the frontend developer.
- Implement endpoints for feedstocks, measurements and conversion pathways.
- Handle validation and data processing.
- Prepare the backend to receive structured scientific research.
- Investigate how the ML component could eventually integrate with the backend.

### Monday deliverables
1. Initial database entity and relationship proposal.
2. Proposed API endpoints and their expected inputs/outputs.
3. Basic NestJS project structure.
4. Agreement with Calvin on the data the frontend needs.
5. A structured data template for receiving research from the scientific team.

### Important note
We have not started database implementation yet. Therefore, the immediate task is to design the data structure and prepare the backend skeleton.

We should NOT begin manually entering large amounts of scientific data into a database before the schema and required fields have been agreed upon.

In the meantime, research findings should be collected in structured spreadsheets or documents so that they can be imported later.

**Priority:** Critical

## FIDEL — MICROBIOLOGY & BIOCONVERSION RESEARCH LEAD

**Primary responsibility:** Investigating the biological processes through which agricultural by-products and other suitable nutrient sources could produce protein-rich biomass or other useful products.

### Research stream A: Agricultural by-product conversion

- Identify microorganisms capable of utilising the selected feedstock.
- Investigate possible fermentation and bioconversion pathways.
- Establish the conditions required by each pathway.
- Identify the expected products.
- Research experimentally reported yields and productivity.
- Identify biological limitations and potential hazards.
- Provide scientific references for all important claims.

### Research stream B: Spirulina investigation

Investigate the possibility of using Spirulina (*Arthrospira platensis* and related cultivated strains) as an alternative protein source.

Specifically:

1. Understand Spirulina cultivation and its nutritional requirements.
2. Investigate its potential as a human-food and animal-feed protein ingredient.
3. Research whether nutrients recovered from agricultural by-products or processing waste streams could support its cultivation.
4. Identify potential waste streams that could supply nitrogen, phosphorus and other nutrients.
5. Investigate the pretreatment or nutrient-recovery processes that would be required.
6. Research cultivation conditions, including light, temperature, pH and nutrient availability.
7. Find experimentally reported biomass productivity and protein content.
8. Investigate contamination, heavy-metal and other safety concerns.
9. Assess whether Spirulina cultivation could be a viable case study for BIOPATH AI.

**Important:** Distinguish between using agricultural waste directly as a microbial substrate and recovering nutrients from waste to cultivate Spirulina. These are different biological processes.

### Monday deliverables
1. At least two documented conversion pathways for the proposed primary feedstock, if sufficient evidence exists.
2. A separate Spirulina research brief.
3. A shortlist of possible case studies for the microbiology component.
4. Supporting research papers and experimental data.
5. A recommendation on which biological pathways are most suitable for the hackathon demonstration.

**Priority:** Critical

## ADIJA — FOOD SCIENCE RESEARCH: HUMAN FOOD

**Primary responsibility:** Investigating the nutritional quality and potential human-food applications of the resulting protein products.

### Tasks
- Research the nutritional composition of the proposed feedstocks.
- Investigate protein content and quality.
- Research amino acid composition and essential amino acid requirements.
- Investigate protein digestibility and bioavailability.
- Identify relevant antinutritional factors.
- Investigate processing requirements for potential human-food applications.
- Research food-safety considerations, including microbiological and chemical hazards.
- Identify the tests required before a resulting ingredient could be considered suitable for human consumption.

### Case-study selection task
Work with Fidel to identify which feedstock-product combinations are worth investigating from a human-food perspective.

Possible directions include:
- Microbial protein produced from agricultural by-products.
- Fungal protein from suitable plant-processing residues.
- Spirulina biomass as an alternative protein ingredient.

### Monday deliverables
1. A shortlist of potential human-food case studies.
2. Nutritional requirements and important evaluation metrics.
3. Available nutritional data for the shortlisted materials/products.
4. Relevant food-safety concerns and testing requirements.
5. Supporting scientific references.

**Priority:** High

## VANESSA — FOOD SCIENCE RESEARCH: ANIMAL FEED

**Primary responsibility:** Investigating the nutritional suitability and potential animal-feed applications of alternative protein products.

### Tasks
- Identify the animal species that would be relevant to our case studies.
- Research species-specific protein and amino acid requirements.
- Investigate protein digestibility and nutritional value.
- Research possible applications of microbial protein and Spirulina biomass in animal feed.
- Investigate antinutritional factors and relevant feed-safety concerns.
- Research possible inclusion levels and limitations where reliable studies are available.
- Identify nutritional and safety tests that would be required.

### Case-study selection task
Work with Fidel to identify promising feedstock-product combinations for animal-feed applications.

Possible directions include:
- Single-cell protein from agricultural by-products.
- Fungal biomass.
- Spirulina as a protein ingredient in aquaculture or poultry feed.

### Monday deliverables
1. A shortlist of potential animal-feed case studies.
2. A proposed target animal species.
3. Nutritional requirements and relevant evaluation metrics.
4. Available nutritional and digestibility data.
5. Safety considerations and supporting references.

**Priority:** High

## NJANE KARANJA — FINANCE, SOURCING & LOGISTICS

**Primary responsibility:** Determining whether the proposed feedstocks and conversion processes are practically and economically viable.

### Tasks
- Investigate locally available agricultural and food-processing by-products.
- Identify possible suppliers or industries producing these materials.
- Estimate material availability and quantities.
- Research collection, transportation and storage requirements.
- Investigate the costs of obtaining and preparing the raw materials.
- Estimate relevant processing and operational costs.
- Investigate the economic requirements of the proposed conversion pathways.
- Identify potential economic advantages and limitations.

### Case-study selection task
Evaluate the proposed feedstocks from a Kenyan sourcing and logistics perspective.

For Spirulina, investigate:
- Availability and cost of cultivation inputs.
- Water, nutrient and energy requirements.
- Possible cultivation infrastructure.
- Harvesting and drying costs.

### Monday deliverables
1. A shortlist of locally relevant feedstocks.
2. Potential sources and suppliers where identifiable.
3. Indicative sourcing and transportation costs.
4. Major processing cost categories.
5. An initial feasibility comparison between candidate case studies.

**Priority:** High

---

# 3. MONDAY CASE-STUDY SELECTION

This is one of our most important immediate tasks.

We need to select the specific examples that our application will use to demonstrate its capabilities.

Rather than selecting materials arbitrarily, the scientific team should propose candidates and evaluate them using the following criteria:

| Selection criterion | What we need to establish |
|---|---|
| Availability | Can the feedstock realistically be sourced? |
| Nutritional composition | Do we have reliable composition data? |
| Biological feasibility | Is there evidence supporting a conversion pathway? |
| Experimental evidence | Are there published studies with measurable results? |
| Product relevance | Is the resulting product potentially useful? |
| Safety | Are the major hazards and testing requirements identifiable? |
| Economic feasibility | Can we estimate the main processing costs? |
| Data availability | Is there enough information to represent the case study in our system? |

### Proposed case-study structure

We should aim to select:

**Case study 1 — Primary agricultural by-product**

One feedstock with at least two scientifically documented conversion pathways.

**Case study 2 — Alternative protein cultivation**

Spirulina, investigating whether agricultural or processing waste-derived nutrients could support its cultivation.

These are proposed directions, not final commitments. The meeting should determine whether both can be supported by sufficient evidence and completed within the available time.

### Who selects what?

- Fidel: Biological feasibility and conversion pathways.
- Adija: Human-food suitability.
- Vanessa: Animal-feed suitability.
- Njane: Local availability and economics.
- Wambua: Product scope and final prioritisation.
- Jonah: Data availability and technical feasibility.

**Deadline: Monday, 23 November.**

---

# 4. HOW RESEARCH SHOULD BE SUBMITTED

We need research that can actually be used by the application, not just paragraphs of general information.

For each case study, record:

### A. Feedstock information
- Name
- Source
- Origin
- Moisture content
- Protein content
- Carbohydrate content
- Fibre content
- Fat content
- Ash content
- pH
- Measurement units and wet/dry basis
- Source of each measurement

### B. Conversion pathway
- Pathway name
- Microorganism or biological agent
- Feedstock used
- Pretreatment requirements
- Process conditions
- Expected product
- Reported yield or productivity
- Limitations
- Supporting publication

### C. Product information
- Product name
- Protein content
- Amino acid profile, if available
- Digestibility, if available
- Potential application
- Safety concerns
- Required testing

### D. Economic information
- Raw material cost
- Transportation cost
- Preparation cost
- Processing requirements
- Energy requirements
- Other operational costs
- Assumptions and sources

Where information is unavailable, mark it as **unknown** rather than estimating or inventing it.

Every scientific measurement should have a source and its measurement basis.

---

# 5. DEVELOPMENT AND INTEGRATION PLAN

Research and software development will proceed in parallel.

### Backend — Jonah
- Establish the project structure.
- Propose the database entities and relationships.
- Define the initial API contract.
- Prepare endpoints for feedstocks, measurements and pathways.
- Wait for the agreed case-study structure before bulk data entry.

### Frontend — Wambua / Calvin
- Establish the React project.
- Build the basic application layout.
- Create feedstock input and display interfaces.
- Build a pathway comparison interface using clearly labelled sample data.
- Coordinate API integration with Jonah.

### Scientific research — Fidel, Adija and Vanessa
- Select case studies.
- Collect experimental results.
- Standardise measurements.
- Document sources

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg" />
  <img src="assets/banner-light.svg" alt="Shezin Khais, Computer Science Student, Python Tooling and Research Utilities" />
</picture>

Computer science student building small, focused tools in Python: developer
tooling and research-analysis utilities. I try to make each one genuinely
usable rather than a demo, so every project has a test suite, GitHub Actions
CI, and a README that explains both how it works and where it falls short.

[![Portfolio](https://img.shields.io/badge/Portfolio-shezinkhais.github.io-3776AB?style=flat-square&logo=githubpages&logoColor=white)](https://shezinkhais.github.io/)
[![Email](https://img.shields.io/badge/Email-shezinkhais%40gmail.com-informational?style=flat-square&logo=gmail&logoColor=white)](mailto:shezinkhais@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-shezinkhaiser-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shezinkhaiser/)

---

### Featured

**[CodeCartographer](https://github.com/ShezinKhais/codecartographer)** &nbsp;·&nbsp; [live demo](https://shezinkhais.github.io/codecartographer/) &nbsp;·&nbsp; [![tests](https://github.com/ShezinKhais/codecartographer/actions/workflows/tests.yml/badge.svg)](https://github.com/ShezinKhais/codecartographer/actions/workflows/tests.yml)

Static analysis for Python codebases: module dependency graphs, circular-import
detection via Tarjan's strongly connected components, a static call graph, and
dead-code detection. No runtime dependencies, and the graph algorithms are
implemented from scratch. It generates a self-contained interactive HTML map you
can open in any browser.

*Python · AST · graph algorithms · zero dependencies*

**[HarmonicDNA](https://github.com/ShezinKhais/harmonicDNA)** &nbsp;·&nbsp; [![tests](https://github.com/ShezinKhais/harmonicDNA/actions/workflows/tests.yml/badge.svg)](https://github.com/ShezinKhais/harmonicDNA/actions/workflows/tests.yml)

Applies Smith-Waterman local alignment, the bioinformatics algorithm for
comparing DNA sequences, to chord progressions extracted from audio. Two songs
in, out comes a similarity score and a visual alignment of the passages that are
most harmonically alike.

*Python · signal processing · sequence alignment*

---

### In progress

**[EchoLock](https://github.com/ShezinKhais/echolock)** &nbsp;·&nbsp; [![tests](https://github.com/ShezinKhais/echolock/actions/workflows/tests.yml/badge.svg)](https://github.com/ShezinKhais/echolock/actions/workflows/tests.yml)

A voice-and-passphrase unlock overlay. The MFCC speaker-verification pipeline is
implemented from scratch on numpy, paired with a passphrase that rotates daily
and is checked by an offline speech recognizer. No pretrained speaker model and
no cloud calls. The README documents the measured tradeoffs behind the scoring
function and threshold, including the approach that looked safe and was not.

*Python · signal processing · speaker verification*

**[C.L.I.P](https://github.com/ShezinKhais/Cognitive_Learning_Intelligence_Platform)**

Team capstone (CSIT321, University of Wollongong in Dubai). A Microsoft Teams app
that generates comprehension checkpoints from a lecturer's own slides and surfaces
real-time engagement, without ever storing video, audio, or transcripts.

*FastAPI · React · PostgreSQL · local LLM inference*

---

### Other projects

| Project | What it does |
|---|---|
| [claimaudit](https://github.com/ShezinKhais/claimaudit) | Tracks whether a paper's empirical claims are later confirmed, challenged, or extended by the work that cites them. |
| [Hypothesisgraveyard](https://github.com/ShezinKhais/Hypothesisgraveyard) | Finds scientific hypotheses that were published and then never meaningfully engaged with by later citations. |
| [argumentminer](https://github.com/ShezinKhais/argumentminer) | Extracts claims, premises, and logical fallacies from argumentative text and renders the structure as a directed graph. |
| [federated-aml](https://github.com/ShezinKhais/federated-aml) | Federated Averaging (FedAvg) for fraud detection across simulated banks: models train locally, only weights are shared. |

---

### How these are built

Standard-library-first where practical, small dependency footprints, pytest
suites, and GitHub Actions CI on every push. The tools that depend on external
APIs ship an offline demo mode so they run from a fresh clone with no setup.

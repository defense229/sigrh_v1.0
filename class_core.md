```mermaid
classDiagram
User --|> Repository
Candidat --|> Repository
Exam --|> Repository
Center --|> Repository
Departement --|> Repository
Repartition --|> Repository
Candidat --* Exam
Center --* Exam
Departement --* Exam
Repartition --* Exam
Repartition --* Departement
```

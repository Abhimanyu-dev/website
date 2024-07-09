import pandas as pd
import csv

headers = ["Name", "Roll No.", "Company", "ProgrammeandDepartment", "Profile", "Companies & Profiles that you were shortlisted for", "Insights on the Selection Process", "Q5. Insights on Interview Process?", "Q6. Sample Interview Questions?", "Preparation Resources", "Advice for students (dos and don’ts)?"]

df = pd.read_csv("./intern2024.csv")
file = open("./intern2024[1].csv", "w", newline="", encoding="utf-8")
writer = csv.writer(file)
writer.writerow(headers)

for header in headers:
    df[header] = df[header].astype(str)


for index, row in df.iterrows():
    dummy_row = []
    dummy_row.append(" ".join(row["Name"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Roll No."].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Company"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["ProgrammeandDepartment"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Profile"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Companies & Profiles that you were shortlisted for"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Insights on the Selection Process"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Q5. Insights on Interview Process?"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Q6. Sample Interview Questions?"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Preparation Resources"].split()).replace(':', '-'))
    dummy_row.append(" ".join(row["Advice for students (dos and don’ts)?"].split()).replace(':', '-'))
    writer.writerow(dummy_row)




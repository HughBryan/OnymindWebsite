import os
import json



path = "images/Oscar_Resources/RENTAL PHOTOS"

data_ls = []
json_data = json
data_header = {}

for folder in os.listdir(path):
    folder_path = path+"/"+folder

    section = folder_path.split("/")
    section = section[len(section)-1]
    print(section)

    section_data = []

    for file in os.listdir(folder_path):
        data = {}
        file_path = folder_path+"/"+file

        if file.startswith("._"):
            continue

        if file_path.endswith(".png") or file_path.endswith("jpg") or file_path.endswith("jpeg") or file_path.endswith(".webp"):

            try:

                data["image"] = file_path
                price = file_path.strip(".webp").strip(".jpeg").strip(".jpg").split("$")
                data["price"] = price[len(price)-1].strip()
                name = file_path.split("__")[0].split("/")
                name = name[len(name)-1].replace(".","").replace("_","").strip()
                data['name'] =name
                

                section_data.append(data)


            except: print("failed: "+file_path)



    data_header[section] = section_data

json_data = json.dumps(data_header)


# Writing to sample.json
with open("rental.json", "w") as outfile:
    outfile.write(json_data)
import os
from striprtf.striprtf import rtf_to_text
import json

def read_file(file_name):
    with open(file_name,"r") as infile:
        content = infile.read()
        text = rtf_to_text(content)
        return text

path = "Images/Oscar_Resources/Gaff Work"

count = 1

data_ls = []

json_data = json

for folder in os.listdir(path):
    folder_path = path+"/"+folder

    url = None
    images = []
    data = {}

    try:
        print(folder_path)
        file_name_sections = folder.split("/")
        title = file_name_sections[len(file_name_sections)-1].split("\uf022\uf022")
        data["title"] = title[0]


    except Exception as e:
        print(e)
        exit(0)



    for file in os.listdir(folder_path):
        file_path = folder_path+"/"+file




        # Get all rtf file link
        if file_path.endswith(".url"):
            url = read_file(file_path)
            url = url[url.find("URL=")+4:url.find("IDList=")]
            url = url.replace("watch?v=","embed/")

        if file_path.endswith(".png") or file_path.endswith("jpg") or file_path.endswith("jpeg"):
            images.append(file_path)






    try:
        data['image1'] = images[0]
        data['image2'] = images[1]
        data['image3'] = images[2]
        data['url'] = url
        data_ls.append(data)


    except: print("failed: "+file_path)
json_data = json.dumps(data_ls)


# Writing to sample.json
with open("GAFF.json", "w") as outfile:
    outfile.write(json_data)
 export function distributePins(data, newData){
        const updated = data.map((column) => [...column]);

        newData.forEach((element, index) => {
          updated[index % updated.length].push(element);
        });
        return updated;
 }
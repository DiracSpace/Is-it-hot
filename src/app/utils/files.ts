export default {
    /**
   * Receives a JSON file and returns contents
   * 
   * usage:
   * 
   * async function() {
   *    const foo = await this.getJsonContents<Type>(file);
   * }
   * 
   * @param file JSON file
   * @returns Promise of contents
   */
    getJsonContents<T>(file: File): Promise<T> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = () => resolve(JSON.parse(reader.result as string));
            reader.onerror = (error) => reject(error);
        });
    },
    
    toBase64(file: File) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    },
}
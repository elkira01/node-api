abstract class AbstractFileUploadService {
    constructor(
        protected storagePath: string,
        protected storageFolder?: string
    ) {}

    abstract validateFile(file: File): boolean

    abstract uploadFile(file: File): Promise<string>

    abstract deleteFile(): void
}

export default AbstractFileUploadService

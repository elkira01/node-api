import AbstractFileUploadService from '../AbstractFileUploadService'
import { put } from '@vercel/blob'

export class VercelImageUploadService extends AbstractFileUploadService {
    constructor(
        public target:
            | 'covers'
            | 'profile-images'
            | 'default-images' = 'default-images'
    ) {
        super('', `/${target}`)
    }

    validateFile(file: File): boolean {
        return true
    }

    async uploadFile(file: File): Promise<string> {
        const blob = await put(`${this.storageFolder}/${file.name}`, file, {
            access: 'public',
        })

        return blob.url
    }

    deleteFile(): void {}
}

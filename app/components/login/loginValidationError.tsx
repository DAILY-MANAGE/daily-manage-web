export default function LoginValidationError({ message }: { message: any }) {
    return (
        <div className="rounded border border-red-600 bg-red-50 p-1 text-red-600">
            {message}
        </div>
    );
}
export default function LoginValidationError({ message }: { message: any }) {
    return (
        <p className="font-bold p-1 text-rose-600">
            {message}
        </p>
    );
}

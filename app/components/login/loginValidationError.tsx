export default function LoginValidationError({ message }: { message: any }) {
    return (
        <p className="font-bold p-1 px-0 text-rose-800">
            {message}
        </p>
    );
}

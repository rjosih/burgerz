import {
	type ReactElement,
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
} from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { handleRestaurantSelect } from "../helperFunctions/handleRestaurantSelect";
import { restaurantsApi } from "../mocks/api";
import type { FormValues } from "../helperFunctions/types";

interface Props {
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	restaurantQuery: string;
	setRestaurantQuery: (query: string) => void;
	error?: string;
}

export const ChooseRestaurantReview = ({
	register,
	setValue,
	restaurantQuery,
	setRestaurantQuery,
	error,
}: Props): ReactElement => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const listRef = useRef<HTMLUListElement>(null);
	const { items: filteredRestaurants } = restaurantsApi.list({
		search: restaurantQuery,
		limit: 10,
	});
	const isExpanded = showDropdown && filteredRestaurants.length > 0;

	// Scroll active option into view
	useEffect(() => {
		if (activeIndex >= 0 && listRef.current) {
			const active = listRef.current.querySelector<HTMLLIElement>(
				`[id="option-${filteredRestaurants[activeIndex]?.id}"]`
			);
			active?.scrollIntoView({ block: "nearest" });
		}
	}, [activeIndex, filteredRestaurants]);

	const selectOption = (index: number): void => {
		const restaurantOptions = filteredRestaurants[index];
		if (restaurantOptions) {
			handleRestaurantSelect(
				restaurantOptions.id,
				restaurantOptions.name,
				setValue,
				setRestaurantQuery,
				setShowDropdown
			);
			setActiveIndex(-1);
		}
	};

	const handleKeyDown = (_event: KeyboardEvent<HTMLInputElement>): void => {
		switch (_event.key) {
			case "ArrowDown":
				_event.preventDefault();
				setShowDropdown(true);
				setActiveIndex((previous) =>
					Math.min(previous + 1, filteredRestaurants.length - 1)
				);
				break;
			case "ArrowUp":
				_event.preventDefault();
				setActiveIndex((previous) => Math.max(previous - 1, -1));
				break;
			case "Enter":
				if (isExpanded && activeIndex >= 0) {
					_event.preventDefault();
					selectOption(activeIndex);
				}
				break;
			case "Escape":
				_event.preventDefault();
				setShowDropdown(false);
				setActiveIndex(-1);
				break;
		}
	};

	const activeOptionId =
		activeIndex >= 0
			? `option-${filteredRestaurants[activeIndex]?.id}`
			: undefined;

	return (
		<div className="flex flex-col gap-1">
			<label
				className="text-sm font-medium text-slate-700"
				htmlFor="restaurant-search"
			>
				Restaurant
			</label>
			<input type="hidden" {...register("restaurantId")} />
			<div className="relative">
				<input
					aria-activedescendant={activeOptionId}
					aria-autocomplete="list"
					aria-controls="restaurant-listbox"
					aria-describedby={error ? "restaurant-error" : undefined}
					aria-expanded={isExpanded}
					aria-haspopup="listbox"
					aria-invalid={!!error}
					aria-required="true"
					autoComplete="off"
					className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
					id="restaurant-search"
					placeholder="Search for a restaurant..."
					role="combobox"
					type="text"
					value={restaurantQuery}
					onKeyDown={handleKeyDown}
					onBlur={() => {
						setTimeout(() => {
							setShowDropdown(false);
							setActiveIndex(-1);
						}, 150);
					}}
					onChange={(event) => {
						const nextQuery = event.target.value;
						setRestaurantQuery(nextQuery);
						setShowDropdown(true);
						setActiveIndex(-1);

						if (!nextQuery) {
							setValue("restaurantId", "", { shouldValidate: false });
						}
					}}
					onFocus={() => {
						setShowDropdown(true);
					}}
				/>
				{isExpanded && (
					<ul
						ref={listRef}
						className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-md"
						id="restaurant-listbox"
						role="listbox"
					>
						{filteredRestaurants.map((restaurant, index) => (
							<li
								key={restaurant.id}
								aria-selected={activeIndex === index}
								id={`option-${restaurant.id}`}
								role="option"
								className={`cursor-pointer px-4 py-2 text-sm text-slate-700 ${
									activeIndex === index ? "bg-slate-100" : "hover:bg-slate-50"
								}`}
								onMouseDown={() => {
									selectOption(index);
								}}
							>
								{restaurant.name}
							</li>
						))}
					</ul>
				)}
			</div>
			{error && (
				<p className="text-xs text-red-500" id="restaurant-error" role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
